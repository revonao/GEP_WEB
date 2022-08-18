var map = L.map('map').setView([32.109389, 110.028076], 7);

var tiles = L.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  attributionControl: false,
}).addTo(map);

var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
  layers: "demo:Hanjiang_1984",
  zIndex: 100
});

wmsLayer.addTo(map);

var dataLayer = null;
var layerLegend = null;

function change() {
  if (dataLayer != null) {
    map.removeLayer(dataLayer);
  };
  if (layerLegend != null) {
    map.removeControl(layerLegend);
  };
  var typeName = ""
  if (document.getElementById("types").value == "水源涵养") {
    typeName = "waterConservation"
  } else if (document.getElementById("types").value == "土壤保持") {
    typeName = "soilConservation"
  } else if (document.getElementById("types").value == "防风固沙") {
    typeName = "windbreakAndSandFixation"
  } else if (document.getElementById("types").value == "洪水调蓄") {
    typeName = "floodControl"
  } else if (document.getElementById("types").value == "碳固定") {
    typeName = "carbonFixation"
  } else if (document.getElementById("types").value == "氧气提供") {
    typeName = "oxygenSupply"
  } else if (document.getElementById("types").value == "空气净化") {
    typeName = "airPurification"
  } else if (document.getElementById("types").value == "水质净化") {
    typeName = "waterPurification"
  } else if (document.getElementById("types").value == "气候调节") {
    typeName = "climateRegulation"
  } else if (document.getElementById("types").value == "物种保育") {
    typeName = "speciesConservation"
  }
  var layerName = "demo:" + document.getElementById("years").value + "_" + typeName;
  dataLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
    layers: layerName,
  });
  layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/wms", {
    layers: layerName,
  });
  dataLayer.addTo(map);
  layerLegend.addTo(map);
}
