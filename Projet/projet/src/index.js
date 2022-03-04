import L, { marker } from 'leaflet'
import circuit_trace from './circuit_trace.json'
import * as d3 from 'd3'

const map = L.map('map').setView([15, 0], 3)
var f1DataLive;
var result;
var name = "";
var multipolygon;
var circuitID;
var loc;

var layerGroup;
var myStyle = {
  "color": "red",
  "weight": 8,
  "opacity": 0.65
};

var slider = document.getElementById("myRange");
var year = new Date().getFullYear();  // returns the current year;
document.getElementById("year").textContent = year;
// Update the current slider value (each time you drag the slider handle)
slider.onchange = function () {

  map.removeLayer(layerGroup);
  map.eachLayer(function (layer) {
    if (layer instanceof L.GeoJSON) {
      map.removeLayer(layer);

    }
    
  });
  year = this.value;
  //console.log("Changed !");
  fetchData();
  fetchDataResults()
  addMarker();
}
slider.oninput = function () {

  year = this.value;
  console.log(year);
  document.getElementById("year").textContent = year;

}

function fetchData() {

  fetch("https://ergast.com/api/f1/" + year + "/circuits.json?limit=100")
    .then(r => r.json())
    .then(data => f1DataLive = data)
    .then(data => console.log("Circuit: " + data))

}


function fetchDataResults() {

  fetch("https://ergast.com/api/f1/" + year + "/results.json?limit=1000")
    .then(r => r.json())
    .then(data => result = data)
    .then(data => console.log("Result: " + data))
    
}


L.tileLayer(
  // 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
  //'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.{ext}',
  {
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href= "https://carto.com/about-carto/">CARTO</a>',
    subdomains: 'abcd',
    minZoom: 3,
    maxZoom: 20,
    ext: 'png',
  })
  .addTo(map)

const icon = L.icon({
  iconUrl: 'images/location.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

map.on('moveend', function () {
  console.log(map.getZoom());
  if (map.getZoom() <= 12) {
    console.log("nope");
    document.getElementById("info").style.visibility = "hidden";
    map.eachLayer(function (layer) {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);

      }
    });
  }
  if (map.getZoom() > 12) {
    //console.log("yup");
    multipolygon = L.geoJSON(
      circuit_trace, {
      style: myStyle
    })
    multipolygon.addTo(map);
  }
});


function clean_map() {
  map.eachLayer(function (layer) {
    if (layer instanceof L.GeoJSON) {
      map.removeLayer(layer);
    }
    //console.log(layer);
  });

  d3.selectAll("#podium svg").remove();
  d3.selectAll("#BestAverageSpeed svg").remove();

}

// Cacher le pop up d'information
function onMapClick(e) {

  document.getElementById("info").style.visibility = "hidden";
  map.flyTo([15, 0], 3, { 'duration': 1.2 });
  clean_map();
  //console.log("clean");
}

// Afficher la popup d'information
map.on('click', onMapClick);
fetchData();
fetchDataResults()
addMarker();



function addMarker() {

  layerGroup = L.layerGroup().addTo(map);

  setTimeout(() => {

    console.log("CircuitTime: " + f1DataLive.MRData.CircuitTable.Circuits.length)

    for (var i = 0; i < f1DataLive.MRData.CircuitTable.Circuits.length; i++) {

      loc = L.marker([f1DataLive.MRData.CircuitTable.Circuits[i].Location.lat, f1DataLive.MRData.CircuitTable.Circuits[i].Location.long], { icon });
      layerGroup.addLayer(loc)
      loc.bindPopup(L.popup().setContent(f1DataLive.MRData.CircuitTable.Circuits[i].circuitName));
      loc.on("mouseover", function (evt) { this.openPopup(); });
      loc.on("mouseout", function (evt) { this.closePopup(); });
      loc.on('click', function (e) { showInfo(e) });

    }

  }, 1000);

  var overlay = { 'markers': layerGroup };
  L.control.layers(null, overlay).addTo(map);
}

function showInfo(e) {
  clean_map();
  for (var i = 0; i < f1DataLive.MRData.CircuitTable.Circuits.length; i++) {

    if (e.latlng.lng == f1DataLive.MRData.CircuitTable.Circuits[i].Location.long) {
      var ret = f1DataLive.MRData.CircuitTable.Circuits[i].url.replace("http:\/\/en.wikipedia.org\/wiki\/", "");

      circuitID = f1DataLive.MRData.CircuitTable.Circuits[i].circuitId;
      console.log(circuitID);
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + ret + "&exsentences=3&exintro=1&explaintext=1&exsectionformat=plain&origin=*&redirects",
        dataType: "json",
        success: function (data) {

          var pageid = [];
          for (var id in data.query.pages) {
            pageid.push(id);
          }

          document.getElementById("intro").textContent = data.query.pages[pageid[0]].extract;
          multipolygon = L.geoJSON(
            circuit_trace, {
            style: myStyle
          })
          setTimeout(() => {
            multipolygon.addTo(map);
          }, 1000);
         
        },
        error: function (xhr) {
          alert(xhr.statusText)
        }
      })

      // console.log(ret);
      document.getElementById("titre").textContent = f1DataLive.MRData.CircuitTable.Circuits[i].circuitName;
      document.getElementById("country").textContent = f1DataLive.MRData.CircuitTable.Circuits[i].Location.country;
      document.getElementById("city").textContent = " | " + f1DataLive.MRData.CircuitTable.Circuits[i].Location.locality;

      setTimeout(() => {

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
            var resultTab = result.MRData.RaceTable.Races[i].Results;
            const resultPodium = resultTab.filter(resultTab => resultTab.position < 4);
            console.log(resultPodium);
            //console.log(result);

            //set up svg using margin conventions - we'll need plenty of room on the left for labels
            var margin = {
              top: 15,
              right: 25,
              bottom: 15,
              left: 110
            };

            var width = 230 - margin.left - margin.right,
              height = 250 - margin.top - margin.bottom;

            var svg = d3.select("#podium").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            var x = d3.scaleLinear()
              .range([0, width])
              .domain([0, d3.max(resultPodium, function (d) {
                return d.position;
              })]);

            var y = d3.scaleBand()
              .rangeRound([0, height])
              .padding(0.1)
              .domain(resultPodium.map(function (d) {
                return d.Driver.givenName + " " + d.Driver.familyName;
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
              
            //append rects <p id="PasDispoP">Données pas disponibles</p>
            bars.append("rect")
              .attr("class", "bar")
              .attr("y", function (d) {
                return y(d.Driver.givenName + " " + d.Driver.familyName);
              })
              .attr("height", y.bandwidth())
              .attr("x", 0)
              .attr("width", function (d) {
                if (d.position == 1) {
                  return x(0);
                } else if (d.position == 2) {
                  return x(0);
                } else {
                  return x(0);
                }

              })
              .attr("fill", function (d) {

                if (d.position == 1) {
                  return '#FFD700';
                } else if (d.position == 2) {
                  return '#CECECE';
                } else {
                  return '#614E1A';
                }

              });

            //add a value label to the right of each bar
            bars.append("text")
              .attr("class", "label")
              //y position of the label is halfway down the bar
              .attr("y", function (d) {
                return y(d.Driver.givenName + " " + d.Driver.familyName) + y.bandwidth() / 2 + 4;
              })
              //x position is 3 pixels to the right of the bar
              .attr("x", function (d) {

                if (d.position == 1) {

                  return x(3) + 3;
                } else if (d.position == 2) {
                  return x(d.position) + 3;
                } else {
                  return x(1) + 3;
                }
              })
              .text(function (d) {
                if (d.position == 1) {

                  return "1er";
                } else if (d.position == 2) {
                  return "2e";
                } else {
                  return "3e";
                }
              });

            svg.selectAll("rect")
              .transition()
              .duration(800)
              .attr("height", y.bandwidth())
              .attr("x", 0)
              .attr("width", function (d) {
                if (d.position == 1) {

                  return x(3);
                } else if (d.position == 2) {
                  return x(d.position);
                } else {
                  return x(1);
                }

              })
              .delay(function (d, i) { console.log(i); return (i * 100) });


           // console.log("add");

            //---------------------------------------------------------------------------
            //Speedometer

            var BestAverageSpeed = 0;
            console.log(BestAverageSpeed);
            console.log(resultTab);
            for (var i = 0; i < resultTab.length; i++) {

              if (BestAverageSpeed < resultTab[i].FastestLap.AverageSpeed.speed) {

                BestAverageSpeed = resultTab[i].FastestLap.AverageSpeed.speed;
              }

            }

           // console.log(BestAverageSpeed);

            // Data
            var value = (BestAverageSpeed / 260);
            var text = BestAverageSpeed + 'Km/h'
            var data = [value, 1 - value]

            // Settings
            var width = 250
            var height = 150
            var anglesRange = 0.5 * Math.PI
            var radis = Math.min(width, 2 * height) / 2
            var thickness = 50

            var duration = 1500;
            var transition = 200;
           
            var colors = ["#cc0000", "#F5F5F5"]

            var pies = d3.pie()
              .value(d => d)
              .sort(null)
              .startAngle(anglesRange * -1)
              .endAngle(anglesRange)

            var arc = d3.arc()
              .outerRadius(radis)
              .innerRadius(radis - thickness)

            var translation = (x, y) => `translate(${x}, ${y})`

            // Feel free to change or delete any of the code you see in this editor!
            var svg = d3.select("#BestAverageSpeed").append("svg")
              .attr("width", width)
              .attr("height", height)
              .attr("class", "half-donut")
              .append("g")
              .attr("transform", translation(width / 2, height))

            svg.selectAll("path")
              .data(pies(data))
              .enter()
              .append("path")
              .attr("fill", (d, i) => colors[i])
              .attr("d", arc)

            svg.append("text")
              .text(d => text)
              .attr("dy", "-3rem")
              .attr("class", "label")
              .attr("text-anchor", "middle")

            //Speedometer
            //---------------------------------------------------------------------------

          }


        }
      }, 700);

    }

  }

  document.getElementById("info").style.visibility = "visible";
  //console.log(e.latlng.lng);
  map.flyTo(e.latlng, 15, { 'duration': 1.2 });
  
}

//---------------------------------------------------------------------------



