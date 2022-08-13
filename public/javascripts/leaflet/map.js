var map = L.map('map').setView([32.109389, 110.028076], 7);

var tiles = L.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    attributionControl: false,
}).addTo(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
}

var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
  layers: "demo:Hanjiang_1984",
});
wmsLayer.addTo(map);

map.on('click', onMapClick);