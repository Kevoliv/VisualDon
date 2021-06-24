import L, { marker } from 'leaflet'
import arbres from './arbres.json'
import batiments from './batiments.json'
import circuit_trace from './circuit_trace.json'
import test from './test.json'
import * as d3 from 'd3'
import resultat from './resultats.json'






//const map = L.map('map').setView([45.62218251898255, 9.284766257898681], 14)

const map = L.map('map').setView([15, 0], 3)
var f1DataLive;
var result;

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

  //map.removeLayer();
  //const map = L.map('map')


  year = this.value;
  console.log(year);
  fetchData();
  fetchDataResults()
  


}

function fetchData() {

  fetch("http://ergast.com/api/f1/" + year + "/circuits.json?limit=100")
    .then(r => r.json())
    .then(data => f1DataLive = data)
    .then(data => console.log("Circuit: " + data))


}


function fetchDataResults() {

  fetch("http://ergast.com/api/f1/" + year + "/results.json?limit=1000")
    .then(r => r.json())
    .then(data => result = data)
    .then(data => console.log("Result: " + data))


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

  d3.selectAll("#podium svg").remove();

}





/*
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


    for (var i = 0; i < data.MRData.CircuitTable.Circuits.length; i++) {
      L.marker([data.MRData.CircuitTable.Circuits[i].Location.lat, data.MRData.CircuitTable.Circuits[i].Location.long], { icon }).addTo(map).bindPopup(data.MRData.CircuitTable.Circuits[i].circuitName);
    }
  },
  error: function (xhr) {
    alert(xhr.statusText)
  }
})
*/








//console.log(testLive);


// Cacher le pop up d'information
function onMapClick(e) {

  document.getElementById("info").style.visibility = "hidden";
  map.flyTo([15, 0], 3, { 'duration': 1.2 });


  clean_map();


  console.log("clean");
}



// Afficher la popup d'information
map.on('click', onMapClick);
var name = "";
var multipolygon;
var circuitID;

fetchData();
fetchDataResults()
//fetchDataResults();
setTimeout(() => {

  console.log("CircuitTime: " + f1DataLive.MRData.CircuitTable.Circuits.length)

  for (var i = 0; i < f1DataLive.MRData.CircuitTable.Circuits.length; i++) {

    L.marker([f1DataLive.MRData.CircuitTable.Circuits[i].Location.lat, f1DataLive.MRData.CircuitTable.Circuits[i].Location.long], { icon }).addTo(map).on('click', function (e) {


      for (var i = 0; i < f1DataLive.MRData.CircuitTable.Circuits.length; i++) {



        if (e.latlng.lng == f1DataLive.MRData.CircuitTable.Circuits[i].Location.long) {
          var ret = f1DataLive.MRData.CircuitTable.Circuits[i].url.replace("http:\/\/en.wikipedia.org\/wiki\/", "");

          circuitID = f1DataLive.MRData.CircuitTable.Circuits[i].circuitId;
          console.log(circuitID);
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


              multipolygon = L.geoJSON(
                circuit_trace, {
                style: myStyle
              }
              )
              setTimeout(() => {
                multipolygon.addTo(map);
              }, 1000);
              /**/


            },
            error: function (xhr) {
              alert(xhr.statusText)
            }
          })

          // console.log(ret);
          document.getElementById("titre").textContent = f1DataLive.MRData.CircuitTable.Circuits[i].circuitName;



         

          setTimeout(() => {

            // console.log("test "+ result.MRData);

            for (var i = 0; i < result.MRData.RaceTable.Races.length; i++) {
              //console.log(result.MRData.RaceTable.Races[i].Circuit.circuitId)
              if (circuitID == result.MRData.RaceTable.Races[i].Circuit.circuitId) {

                /*console.log("avant")
                console.log(result.MRData.RaceTable.Races[i].Circuit.circuitName);
                console.log("Hey")
                console.log("1er " + result.MRData.RaceTable.Races[i].Results[0].Driver.code);
                console.log("2eme " + result.MRData.RaceTable.Races[i].Results[1].Driver.code);
                console.log("3eme " + result.MRData.RaceTable.Races[i].Results[2].Driver.code)


                */

                // var resultTab = resultat.MRData.RaceTable.Races[i].Results;
                var resultTab = result.MRData.RaceTable.Races[i].Results;

                const resultPodium = resultTab.filter(resultTab => resultTab.position < 4);

                console.log(resultPodium);

                //console.log(result);

                //set up svg using margin conventions - we'll need plenty of room on the left for labels
                var margin = {
                  top: 15,
                  right: 25,
                  bottom: 15,
                  left: 60
                };

                var width = 300 - margin.left - margin.right,
                  height = 300 - margin.top - margin.bottom;

                var svg = d3.select("#podium").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  // .attr("width", 400)
                  // .attr("height", 200)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scaleLinear()
                  .range([0, width])
                  .domain([0, d3.max(resultPodium, function (d) {
                    return d.points;
                  })]);

                var y = d3.scaleBand()
                  .rangeRound([0, height])
                  .padding(0.1)
                  .domain(resultPodium.map(function (d) {
                    return d.Driver.code;
                  }));

                //make y axis to show bar names
                var yAxis = d3.axisLeft(y)


                var gy = svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)

                var bars = svg.selectAll(".bar")
                  .data(resultPodium)
                  .enter()
                  .append("g")
                  

                //append rects
                bars.append("rect")
                  .attr("class", "bar")
                  .attr("y", function (d) {
                    return y(d.Driver.code);
                  })
                  .attr("height", y.bandwidth())
                  .attr("x", 0)
                  .attr("width", function (d) {
                    return x(d.points);
                  });

                //add a value label to the right of each bar
                bars.append("text")
                  .attr("class", "label")
                  //y position of the label is halfway down the bar
                  .attr("y", function (d) {
                    return y(d.Driver.code) + y.bandwidth() / 2 + 4;
                  })
                  //x position is 3 pixels to the right of the bar
                  .attr("x", function (d) {
                    return x(d.points) + 3;
                  })
                  .text(function (d) {
                    return d.position;
                  });


                console.log("add");












              }













            }
          }, 700);





        }

      }

      document.getElementById("info").style.visibility = "visible";
      console.log(e.latlng.lng);


      // var info = document.getElementById("info")
      //info.textContent += 'hello world !';

      //console.log("buind");
      //console.log(multipolygon.getBounds());

      map.flyTo(e.latlng, 15, { 'duration': 1.2 });
      //map.flyToBounds(e.latlng,e.latlng, 15, {'duration':1.2});
      // flyTo([test.MRData.CircuitTable.Circuits[2].Location.lat, test.MRData.CircuitTable.Circuits[2].Location.long], 12);
    });

  }

}, 1000);





//---------------------------------------------------------------------------



