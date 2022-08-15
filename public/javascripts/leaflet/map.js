var map = L.map('map').setView([32.109389, 110.028076], 7);

var tiles = L.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  attributionControl: false,
}).addTo(map);

var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
  layers: "demo:Hanjiang_1984",
});
wmsLayer.addTo(map);

function change() {
  const layerName = "demo:"+document.getElementById("years").value+"_"+document.getElementById("types").value;
  var dataLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
    layers: layerName,
  });
  dataLayer.addTo(map);
}
