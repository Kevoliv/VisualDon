import L from 'leaflet'
import arbres from './arbres.json'
import batiments from './batiments.json'
import circuit_trace from './circuit_trace.json'
import test from './test.json'

//const map = L.map('map').setView([45.62218251898255, 9.284766257898681], 14)

const map = L.map('map').setView([15, 0], 3)

var myStyle = {
  "color": "red",
  "weight": 8,
  "opacity": 0.65
};
var slider = document.getElementById("myRange");
//output.innerHTML = slider.value; // Display the default slider value
var year = 2021;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  year = this.value;
  console.log(year);


}



/*let isCacheSupported = 'caches' in window;
 
 
let cacheName = 'f1DataCache';
//let url = "http://ergast.com/api/f1/" + year + "/circuits.json?limit=100";
caches.open(cacheName).then(cache => {
  cache.add(url).then(() => {
    console.log("Data cached ")
  });
});
 
 
function getData(){
 
 
}
 
 
 
 
console.log(year);
 
 
 
 
caches.open(cacheName).then(cache => {
  cache.match(url).then(settings => {
    console.log(settings);
 
    
 
 
 
  })
});
 
 

 
 
 
$.ajax({
  url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=Algarve_International_Circuit&exsentences=4&exintro=1&explaintext=1&exsectionformat=plain",
  dataType: "json",
  success: function (data) {
    console.log(data.query);
    
  },
  error: function (xhr) {
    alert(xhr.statusText)
  }
})
*/
L.tileLayer(
  // 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
  //'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.{ext}',
  {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 3,
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
  L.marker([lat, lon], { icon }).addTo(map).bindPopup(test.MRData.CircuitTable.Circuits[i].circuitName)
})*/



/*
Ajout tracé circuit
L.geoJSON(
  circuit_trace, {
  style: myStyle
}
).addTo(map).on('click', function (e) {

  document.getElementById("info").style.visibility = "visible";
  //console.log(L.Marker)


  
  // flyTo([test.MRData.CircuitTable.Circuits[2].Location.lat, test.MRData.CircuitTable.Circuits[2].Location.long], 12);
});*/


function clean_map() {
  map.eachLayer(function (layer) {
    if (layer instanceof L.GeoJSON) {
      map.removeLayer(layer);

    }
    //console.log(layer);


  });
}


var f1DataLive;



$.ajax({
  url: "http://ergast.com/api/f1/" + year + "/circuits.json?limit=100",
  dataType: "json",
  async: false,
  success: function (data) {
    console.log("success");
    console.log(data);
    // f1DataLive = data; 
    // !!!STORE!!!
    console.log(f1DataLive);
    //getDataF1(data);


    /*for (var i = 0; i < data.MRData.CircuitTable.Circuits.length; i++) {
      L.marker([data.MRData.CircuitTable.Circuits[i].Location.lat, data.MRData.CircuitTable.Circuits[i].Location.long], { icon }).addTo(map).bindPopup(data.MRData.CircuitTable.Circuits[i].circuitName);
    }*/
  },
  error: function (xhr) {
    alert(xhr.statusText)
  }
})



console.log("Dehors");
console.log(f1DataLive);
//console.log(testLive);


// Cacher le pop up d'information
function onMapClick(e) {

  document.getElementById("info").style.visibility = "hidden";
  map.flyTo([15, 0], 3);


  clean_map();
}

// Afficher la popup d'information
map.on('click', onMapClick);
var name = "";

for (var i = 0; i < test.MRData.CircuitTable.Circuits.length; i++) {

  L.marker([test.MRData.CircuitTable.Circuits[i].Location.lat, test.MRData.CircuitTable.Circuits[i].Location.long], { icon }).addTo(map).on('click', function (e) {


    for (var i = 0; i < test.MRData.CircuitTable.Circuits.length; i++) {

      if (e.latlng.lng == test.MRData.CircuitTable.Circuits[i].Location.long) {
        var ret = test.MRData.CircuitTable.Circuits[i].url.replace("http:\/\/en.wikipedia.org\/wiki\/", "");

        $.ajax({
          url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + ret + "&exsentences=4&exintro=1&explaintext=1&exsectionformat=plain&redirects",
          dataType: "json",
          success: function (data) {

            var pageid = [];
            for (var id in data.query.pages) {
              pageid.push(id);
            }
            //console.log(data.query.pages[pageid[0]].extract);
            document.getElementById("intro").textContent = data.query.pages[pageid[0]].extract;


            L.geoJSON(
              circuit_trace, {
              style: myStyle
            }
            ).addTo(map)

          },
          error: function (xhr) {
            alert(xhr.statusText)
          }
        })

        console.log(ret);
        document.getElementById("titre").textContent = test.MRData.CircuitTable.Circuits[i].circuitName;



      }

    }

    document.getElementById("info").style.visibility = "visible";
    console.log(e.latlng.lng);


    // var info = document.getElementById("info")
    //info.textContent += 'hello world !';


    map.flyTo(e.latlng, 15);
    // flyTo([test.MRData.CircuitTable.Circuits[2].Location.lat, test.MRData.CircuitTable.Circuits[2].Location.long], 12);
  });

}







