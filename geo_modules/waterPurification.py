import sys
import os
import numpy as np
from osgeo import gdal, gdal_array
from geo.Geoserver import Geoserver

geo = Geoserver('http://127.0.0.1:8080/geoserver', username='admin', password='geoserver')
root = 'E:\\WorkSpace\\GEP_WebGIS\\App_\\'


fp1 = root + sys.argv[1]
fp2 = root + sys.argv[2]
fp3 = root + sys.argv[3]
fp4 = root + sys.argv[4]

year = sys.argv[5]
price = sys.argv[6]
os.rename(fp1, fp1 + '.tif')
os.rename(fp2, fp2 + '.tif')
os.rename(fp3, fp3 + '.tif')
os.rename(fp4, fp4 + '.tif')
fp1 = fp1 + '.tif'
fp2 = fp2 + '.tif'
fp3 = fp3 + '.tif'
fp4 = fp4 + '.tif'

output = "E:\\WorkSpace\\GEP_WebGIS\\App_\\geo_modules\\geodata\\fileSaved\\" + year

if not os.path.exists(output):
    os.makedirs(output)

output = output + "\\waterPurification.tif"

ds1 = gdal.Open(fp1)
ds2 = gdal.Open(fp2)
ds3 = gdal.Open(fp3)
ds4 = gdal.Open(fp4)

b1 = ds1.GetRasterBand(1)
b2 = ds2.GetRasterBand(1)
b3 = ds3.GetRasterBand(1)
b4 = ds4.GetRasterBand(1)

arr1 = b1.ReadAsArray()
arr2 = b2.ReadAsArray()
arr3 = b3.ReadAsArray()
arr4 = b4.ReadAsArray()

arr1[arr1 == arr1[0][0]] = np.nan
arr2[arr2 == arr2[0][0]] = np.nan
arr3[arr3 == arr3[0][0]] = np.nan
arr4[arr4 == arr4[0][0]] = np.nan


data = 1000 * 1000 * (arr1 - arr2 - arr3) * 2.09 * 0.001
data[data < 0] = 0
data1 = 1000 * 1000 * 0.0001 * arr4

data = data1 + data

value = np.nansum(data)
value = int(value/10000000)

gdal_array.SaveArray(data.astype("float32"), output, "GTIFF", ds1)


ras = gdal.Open(output)
ras.GetRasterBand(1).SetNoDataValue(np.nan)

geo.create_coveragestore(layer_name=year+"_waterPurification", path=output, workspace='demo')

geo.create_coveragestyle(raster_path=output, style_name=year+"_waterPurification_style", workspace='demo', color_ramp='RdYlGn')

geo.publish_style(layer_name=year+"_waterPurification", style_name=year+"_waterPurification_style", workspace='demo')

print(value)
