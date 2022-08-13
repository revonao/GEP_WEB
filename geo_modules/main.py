from geo.Geoserver import Geoserver
geo = Geoserver('http://127.0.0.1:8080/geoserver', username='admin', password='geoserver')
geo.create_workspace(workspace='demo')
geo.create_shp_datastore(path=r'geodata/Hanjiang_1984.zip', store_name='store', workspace='demo')
