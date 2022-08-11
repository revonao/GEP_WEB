var map = L.map('map').setView([31.109389, 110.028076], 8);

var tiles = L.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    attributionControl: false,
}).addTo(map);

var marker = L.marker([31.109389, 110.028076]).addTo(map)
    .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map).bindPopup('I am a circle.');

var polygon = L.polygon([
    [30.109389, 110.028076],
    [31.109389, 113.028076],
    [30.109389, 112.028076]
]).addTo(map).bindPopup('I am a polygon.');


var popup = L.popup()
    .setLatLng([31.109389, 110.028076])
    .setContent('I am a standalone popup.')
    .openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);