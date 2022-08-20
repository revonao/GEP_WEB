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
os.rename(fp1, fp1 + '.tif')
os.rename(fp2, fp2 + '.tif')
os.rename(fp3, fp3 + '.tif')

fp1 = fp1 + '.tif'
fp2 = fp2 + '.tif'
fp3 = fp3 + '.tif'

output = "E:\\WorkSpace\\GEP_WebGIS\\App_\\geo_modules\\geodata\\fileSaved\\" + year

if not os.path.exists(output):
    os.makedirs(output)

output = output + "\\windbreakAndSandFixation.tif"

ds1 = gdal.Open(fp1)
ds2 = gdal.Open(fp2)
ds3 = gdal.Open(fp3)

res = ds1.RasterXSize

b1 = ds1.GetRasterBand(1)
b2 = ds2.GetRasterBand(1)
b3 = ds3.GetRasterBand(1)

arr1 = b1.ReadAsArray()
arr2 = b2.ReadAsArray()
arr3 = b3.ReadAsArray()

arr1[arr1 == arr1[0][0]] = np.nan
arr2[arr2 == arr2[0][0]] = np.nan
arr3[arr3 == arr3[0][0]] = np.nan

data1 = (arr1 - arr2) * 3.75 / (1.4 * 0.1)

data2 = (arr1 - arr2) * arr3

data = data2 + data1

gdal_array.SaveArray(data.astype("float32"), output, "GTIFF", ds1)

value = np.nansum(data)
value = int(value/10000000)

geo.create_coveragestore(layer_name=year+"_windbreakAndSandFixation", path=output, workspace='demo')

geo.create_coveragestyle(raster_path=output, style_name=year+"_windbreakAndSandFixation_style", workspace='demo', color_ramp='RdYlGn')

geo.publish_style(layer_name=year+"_windbreakAndSandFixation", style_name=year+"_windbreakAndSandFixation_style", workspace='demo')

print(value)
