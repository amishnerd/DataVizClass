var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL

d3.json(url, function(data) {
// Once we get a response, send the data.features object to the createFeatures function

    createFeatures(data.features);
});
// Make some color options
function getColor(d) {

    return d < 1 ? 'rgb(250,250,178)' : 
           d < 2 ? 'rgb(250,204,90)' :
           d < 3 ? 'rgb(250,136,60)' :
           d < 4 ? 'rgb(230,60,30)' :
                   'rgb(190,0,40)';
}

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3 align='center'>" + feature.properties.place +
            "</h3><hr><p><u>Occurrence:</u> " + new Date(feature.properties.time) + "</p>" +
            "</h3><p><u>Magnitude:</u> " + feature.properties.mag + "</p>");
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
            radius: 4*feature.properties.mag,
            fillColor: getColor(feature.properties.mag),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    });
    
    createMap(earthquakes);
}

function createMap(earthquakes) {

    var basicmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "pk.eyJ1Ijoia2FyZW5lbWNnZWUiLCJhIjoiY2sweDMzcnFmMDJmZTNjb2M2bTA0bDBsYiJ9.2VPrGXusLoJpCMfTWrgBRQ"
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "pk.eyJ1Ijoia2FyZW5lbWNnZWUiLCJhIjoiY2sweDMzcnFmMDJmZTNjb2M2bTA0bDBsYiJ9.2VPrGXusLoJpCMfTWrgBRQ"
    });
//  stupid urls were down so I had to find a way around it
    // var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //     maxZoom: 18,
    //     id: "mapbox.dark",
    //     accessToken: API_KEY
    //   });
    
    var baseMaps = {
        "Outdoors": basicmap,
        "Light Map": lightmap,
        // "Dark Map": darkmap
    };
    
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var map = L.map("map", {
        center: [39.83, -98.58],
        zoom: 4.5,
        layers: [basicmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {collapsed: false})
             .addTo(map);

    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function (map) {    
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4],
        labels = [];
  
        div.innerHTML+='Magnitude<br><hr>'
    
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    
    return div;
    };
    
    legend.addTo(map);
}