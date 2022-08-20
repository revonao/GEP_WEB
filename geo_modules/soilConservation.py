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
fp5 = root + sys.argv[5]
fp6 = root + sys.argv[6]

year = sys.argv[7]

os.rename(fp1, fp1 + '.tif')
os.rename(fp2, fp2 + '.tif')
os.rename(fp3, fp3 + '.tif')
os.rename(fp4, fp4 + '.tif')
os.rename(fp5, fp5 + '.tif')
os.rename(fp6, fp6 + '.tif')

fp1 = fp1 + '.tif'
fp2 = fp2 + '.tif'
fp3 = fp3 + '.tif'
fp4 = fp4 + '.tif'
fp5 = fp5 + '.tif'
fp6 = fp6 + '.tif'

output = "E:\\WorkSpace\\GEP_WebGIS\\App_\\geo_modules\\geodata\\fileSaved\\" + year

if not os.path.exists(output):
    os.makedirs(output)

output = output + "\\soilConservation.tif"

ds1 = gdal.Open(fp1)
ds2 = gdal.Open(fp2)
ds3 = gdal.Open(fp3)
ds4 = gdal.Open(fp4)
ds5 = gdal.Open(fp5)
ds6 = gdal.Open(fp6)

b1 = ds1.GetRasterBand(1)
b2 = ds2.GetRasterBand(1)
b3 = ds3.GetRasterBand(1)
b4 = ds4.GetRasterBand(1)
b5 = ds5.GetRasterBand(1)
b6 = ds6.GetRasterBand(1)

arr1 = b1.ReadAsArray()
arr2 = b2.ReadAsArray()
arr3 = b3.ReadAsArray()
arr4 = b4.ReadAsArray()
arr5 = b5.ReadAsArray()
arr6 = b6.ReadAsArray()

arr1[arr1 == arr1[0][0]] = np.nan
arr2[arr2 == arr2[0][0]] = np.nan
arr3[arr3 == arr3[0][0]] = np.nan
arr4[arr4 == arr4[0][0]] = np.nan
arr5[arr5 == arr5[0][0]] = np.nan
arr6[arr6 == arr6[0][0]] = np.nan

arr1 = np.array(arr1, dtype=np.float64)
arr2 = np.array(arr2, dtype=np.float64)
arr3 = np.array(arr3, dtype=np.float64)
arr4 = np.array(arr4, dtype=np.float64)
arr5 = np.array(arr5, dtype=np.float64)
arr6 = np.array(arr6, dtype=np.float64)

data = arr1 * arr2 * arr3 * arr4 * (1 - arr5)

data = np.array(data)

value = np.nansum(data)


value1 = np.nansum(arr6)

value = ((1.45 * value) / (1.25 * 0.3)) + ((0.24 * value * 2.3) / 1.25) + value1
value = int(value/10000000)

gdal_array.SaveArray(data.astype("float32"), output, "GTIFF", ds1)

ras = gdal.Open(output)
ras.GetRasterBand(1).SetNoDataValue(np.nan)


geo.create_coveragestore(layer_name=year+"_soilConservation", path=output, workspace='demo')

geo.create_coveragestyle(raster_path=output, style_name=year+"_soilConservation_style", workspace='demo', color_ramp='RdYlGn')

geo.publish_style(layer_name=year+"_soilConservation", style_name=year+"_soilConservation_style", workspace='demo')

print(value)
