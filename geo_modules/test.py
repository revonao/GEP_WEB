import sys
from osgeo import gdal
from geo.Geoserver import Geoserver


geo = Geoserver('http://127.0.0.1:8080/geoserver', username='admin', password='geoserver')
geo.create_workspace(workspace='demo11')



