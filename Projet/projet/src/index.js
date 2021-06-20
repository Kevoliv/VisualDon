import L from 'leaflet'
import arbres from './arbres.json'
import batiments from './batiments.json'
import circuit_trace from './circuit_trace.json'
import test from './test.json'

const map = L.map('map').setView([45.62218251898255, 9.284766257898681], 14)

var myStyle = {
  "color": "red",
  "weight": 8,
  "opacity": 0.65
};

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

/**/var f1LiveData = $.ajax({
  url:"http://ergast.com/api/f1/circuits.json?limit=100",
  dataType: "json",
  success: function(data) {
    console.log(data);
    for (var i=0 ; i<data.MRData.CircuitTable.Circuits.length ; i++) {
      L.marker([data.MRData.CircuitTable.Circuits[i].Location.lat, data.MRData.CircuitTable.Circuits[i].Location.long], { icon }).addTo(map).bindPopup(data.MRData.CircuitTable.Circuits[i].circuitName);
  }
   },
  error: function (xhr) {
    alert(xhr.statusText)
  }
})



L.tileLayer(
 // 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
 //'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.{ext}',
  {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
  })
    .addTo(map)

const icon = L.icon({
  iconUrl: 'https://heig-datavis-2021.surge.sh/carte-leaflet/arbre.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

/*
arbres.map(d => {
  const [lon, lat] = d
  L.marker([lat, lon], { icon }).addTo(map)
})*/



L.geoJSON(
  circuit_trace,{
  style: myStyle
  }
).addTo(map)



