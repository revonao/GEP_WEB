import sys
import os
import numpy as np
from osgeo import gdal, gdal_array
from geo.Geoserver import Geoserver

geo = Geoserver('http://127.0.0.1:8080/geoserver', username='admin', password='geoserver')
root = 'E:\\WorkSpace\\GEP_WebGIS\\App_\\'


fp1 = root + sys.argv[1]
fp2 = root + sys.argv[2]
year = sys.argv[3]
os.rename(fp1, fp1 + '.tif')
os.rename(fp2, fp2 + '.tif')
fp1 = fp1 + '.tif'
fp2 = fp2 + '.tif'

output = "E:\\WorkSpace\\GEP_WebGIS\\App_\\geo_modules\\geodata\\fileSaved\\" + year

if not os.path.exists(output):
    os.makedirs(output)

output = output + "\\waterConservation.tif"

ds1 = gdal.Open(fp1)
ds2 = gdal.Open(fp2)

res = ds1.RasterXSize


b1 = ds1.GetRasterBand(1)
b2 = ds2.GetRasterBand(1)

arr1 = b1.ReadAsArray()
arr2 = b2.ReadAsArray()

arr1[arr1 == arr1[0][0]] = np.nan
arr2[arr2 == arr2[0][0]] = np.nan

data = (arr1 - arr2) * 3.75 * 1000 * 1000
data = np.array(data)

data[data == data[0][0]] = np.nan
data[data < 0] = 0

value = np.nansum(data)

gdal_array.SaveArray(data.astype("float32"), output, "GTIFF", ds1)


ras = gdal.Open(output)
ras.GetRasterBand(1).SetNoDataValue(np.nan)

geo.create_coveragestore(layer_name=year+"_windbreakAndSandFixation", path=output, workspace='demo')

geo.create_coveragestyle(raster_path=output, style_name=year+"_windbreakAndSandFixation_style", workspace='demo', color_ramp='RdYlGn')

geo.publish_style(layer_name=year+"_windbreakAndSandFixation", style_name=year+"_windbreakAndSandFixation_style", workspace='demo')

print(value)
