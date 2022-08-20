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
year = sys.argv[4]
price = sys.argv[5]

os.rename(fp1, fp1 + '.tif')
os.rename(fp2, fp2 + '.tif')
os.rename(fp3, fp3 + '.tif')
fp1 = fp1 + '.tif'
fp2 = fp2 + '.tif'
fp3 = fp3 + '.tif'

output = "E:\\WorkSpace\\GEP_WebGIS\\App_\\geo_modules\\geodata\\fileSaved\\" + year

if not os.path.exists(output):
    os.makedirs(output)

output = output + "\\climateRegulation.tif"

ds1 = gdal.Open(fp1)
ds2 = gdal.Open(fp2)
ds3 = gdal.Open(fp3)

b1 = ds1.GetRasterBand(1)
b2 = ds2.GetRasterBand(1)
b3 = ds3.GetRasterBand(1)

arr1 = b1.ReadAsArray()
arr2 = b2.ReadAsArray()
arr3 = b3.ReadAsArray()

arr1 = np.asarray(arr1, dtype=np.float64)
arr2 = np.asarray(arr2, dtype=np.float64)
arr3 = np.asarray(arr3, dtype=np.float64)

arr1[arr1 == arr1[0][0]] = np.nan
arr2[arr2 == arr2[0][0]] = np.nan
arr3[arr3 == arr3[0][0]] = np.nan

data = (arr1 + arr2 + arr3) / 1000000

value = np.nansum(data) * 5.73
value = int(value)

gdal_array.SaveArray(data.astype("float32"), output, "GTIFF", ds1)

geo.create_coveragestore(layer_name=year+"_climateRegulation", path=output, workspace='demo')

geo.create_coveragestyle(raster_path=output, style_name=year+"_climateRegulation_style", workspace='demo', color_ramp='RdYlGn')

geo.publish_style(layer_name=year+"_climateRegulation", style_name=year+"_climateRegulation_style", workspace='demo')

print(value)
