#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
#  Stack Composed
#
#  Copyright (C) 2016-2017 Xavier Corredor Llano, SMBYC
#  Email: xcorredorl at ideam.gov.co
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
import os
import warnings
import gdal
import numpy as np
from dask.diagnostics import ProgressBar

from stack_composed import header
from stack_composed.image import Image
from stack_composed.stats import statistic

IMAGES_TYPES = ('.tif', '.TIF', 'img', 'IMG')


def run(stat, bands, inputs, output, output_type, num_process, chunksize, start_date=None, end_date=None):
    # ignore warnings
    warnings.filterwarnings("ignore")
    print(header)

    print("\nLoading images in path(s) and calculating the wrapper extent:")
    # search all Image files in inputs recursively if the files are in directories
    images_files = []
    for _input in inputs:
        if os.path.isfile(_input):
            if _input.endswith(IMAGES_TYPES):
                images_files.append(os.path.abspath(_input))
        elif os.path.isdir(_input):
            for root, dirs, files in os.walk(_input):
                if len(files) != 0:
                    files = [os.path.join(root, x) for x in files if x.endswith(IMAGES_TYPES)]
                    [images_files.append(os.path.abspath(file)) for file in files]

    # load bands
    if isinstance(bands, int):
        bands = [bands]
    if not isinstance(bands, list):
        bands = [int(b) for b in bands.split(',')]

    # load images
    images = [Image(landsat_file) for landsat_file in images_files]

    # get wrapper extent
    min_x = min([image.extent[0] for image in images])
    max_y = max([image.extent[1] for image in images])
    max_x = max([image.extent[2] for image in images])
    min_y = min([image.extent[3] for image in images])
    Image.wrapper_extent = [min_x, max_y, max_x, min_y]

    # define the properties for the raster wrapper
    Image.wrapper_x_res = images[0].x_res
    Image.wrapper_y_res = images[0].y_res
    Image.wrapper_shape = (int((max_y-min_y)/Image.wrapper_y_res), int((max_x-min_x)/Image.wrapper_x_res))  # (y,x)

    # some information about process
    print("  images to process: {0}".format(len(images_files)))
    print("  band(s) to process: {0}".format(','.join([str(b) for b in bands])))
    print("  pixels size: {0} x {1}".format(round(Image.wrapper_x_res, 1), round(Image.wrapper_y_res, 1)))
    print("  wrapper size: {0} x {1} pixels".format(Image.wrapper_shape[1], Image.wrapper_shape[0]))

    # set bounds for all images
    [image.set_bounds() for image in images]

    # registered Dask progress bar
    pbar = ProgressBar()
    pbar.register()

    for band in bands:
        # check and set the output file before process
        if os.path.isdir(output):
            output_filename = os.path.join(output, "stack_composed_{}_band{}.tif".format(stat, band))
        elif output.endswith((".tif", ".TIF")) and os.path.isdir(os.path.dirname(output)):
            output_filename = output
        elif output.endswith((".tif", ".TIF")) and os.path.dirname(output) == '':
            output_filename = os.path.join(os.getcwd(), output)
        else:
            print("\nError: Setting the output filename, wrong directory and/or\n"
                  "       filename: {}\n".format(output))
            exit(1)

        ### process ###
        # Calculate the statistics
        print("\nProcessing the {} for band {}:".format(stat, band))
        output_array = statistic(stat, images, band, num_process, chunksize)

        ### save result ###
        # choose the default data type based on the statistic
        if output_type is None:
            if stat in ['median', 'mean', 'max', 'min', 'last_valid_pixel']:
                gdal_output_type = gdal.GDT_UInt16
            if stat in ['std', 'snr']:
                gdal_output_type = gdal.GDT_Float32
            if stat in ['valid_pixels']:
                if len(images) < 256:
                    gdal_output_type = gdal.GDT_Byte
                else:
                    gdal_output_type = gdal.GDT_UInt16
        else:
            if output_type == 'byte': gdal_output_type = gdal.GDT_Byte
            if output_type == 'uint16': gdal_output_type = gdal.GDT_UInt16
            if output_type == 'uint32': gdal_output_type = gdal.GDT_UInt32
            if output_type == 'int16': gdal_output_type = gdal.GDT_Int16
            if output_type == 'int32': gdal_output_type = gdal.GDT_Int32
            if output_type == 'float32': gdal_output_type = gdal.GDT_Float32
            if output_type == 'float64': gdal_output_type = gdal.GDT_Float64
        # create output raster
        driver = gdal.GetDriverByName('GTiff')
        nbands = 1
        outRaster = driver.Create(output_filename, Image.wrapper_shape[1], Image.wrapper_shape[0],
                                  nbands, gdal_output_type)

        # write bands
        outband = outRaster.GetRasterBand(nbands)
        outband.WriteArray(output_array)
        # nodata value
        outband.SetNoDataValue(np.nan)

        # set projection and geotransform
        outRasterSRS = gdal.osr.SpatialReference()
        outRasterSRS.ImportFromWkt(images[0].projection)
        outRaster.SetProjection(outRasterSRS.ExportToWkt())
        outRaster.SetGeoTransform((Image.wrapper_extent[0], Image.wrapper_x_res, 0,
                                   Image.wrapper_extent[1], 0, -Image.wrapper_y_res))

        # clean
        del outRaster

    print("\nProcess completed!")



