/*
** script.js
*/

// DOM LISTENER
google.maps.event.addDomListener(window, 'load', initMap);

/*
******************************************************************************************
******************************************************************************************
******************************** INIT FUNCTIONS ******************************************
******************************************************************************************
******************************************************************************************
*/

// 
// Init the map function
//
function initMap(){
	//64.963051,-19.020835000000034
	var map = getMap(64.963051,-19.020835000000034);


  var gjLayer = L.geoJson(icelandFieldsData);

	// Load GeoJSON data for ICELAND outlines
  loadIcelandOutlines(map);

  // Load GeoJSON data for ICELAND juristiction
  loadIcelandJurisdiction(map);

  //loadIcelandFields(map);
  //var pointInLayer = leafletPip.pointInLayer(point, layer L.GeoJSON, [first])
  //console.log()
	
	// Draw gridlines around Iceland for Latitudes and Longitudes
	drawIcelandGridlines(map);
	
}



/*
******************************************************************************************
******************************************************************************************
******************************** VARIABLES ***********************************************
******************************************************************************************
******************************************************************************************
*/
var lat1=59.5, lat2=70.5, lng1=-32, lng2=-4;

/*
******************************************************************************************
******************************************************************************************
******************************** MAP FUNCTIONS *******************************************
******************************************************************************************
******************************************************************************************
*/

//
//
//
function getMap(Lat,Lng){
	var stylesArray = [
		// No label style
		{
	    featureType: 'all',
	    elementType: 'labels',
	    stylers: [{visibility:'off'}]
	  }
  ];
	
	var minZoomLevel = 5;

	var myOptions = {
		zoom:minZoomLevel, 
		center:new google.maps.LatLng(Lat,Lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: stylesArray
	};

	var map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions)

	// Bounds for ICELAND
	var strictBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(lat1, lng1), 
		new google.maps.LatLng(lat2, lng2)
	);

	// Listen for the dragend event
	google.maps.event.addListener(map, 'dragend', function() {
		if (strictBounds.contains(map.getCenter())) return;

		// We're out of bounds - Move the map back within the bounds
		var c = map.getCenter(),
		x = c.lng(),
		y = c.lat(),
		maxX = strictBounds.getNorthEast().lng(),
		maxY = strictBounds.getNorthEast().lat(),
		minX = strictBounds.getSouthWest().lng(),
		minY = strictBounds.getSouthWest().lat();

		if (x < minX) x = minX;
		if (x > maxX) x = maxX;
		if (y < minY) y = minY;
		if (y > maxY) y = maxY;

		map.setCenter(new google.maps.LatLng(y, x));
	});

	// Limit the zoom level
	google.maps.event.addListener(map, 'zoom_changed', function() {
		if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
	});
	
	return map;
}


//
//
//
function loadIcelandOutlines(map){
	map.data.loadGeoJson('https://raw.githubusercontent.com/bjarnirunarh/googlemapstest/master/data/json/iceland_coordinates.json');

  // Set the stroke width, and fill color for each polygon in the geoJson
  map.data.setStyle({
    fillColor: '#FFFFFF',
    strokeColor: '#C0C0C0',
		strokeOpacity: 1,
		strokeWeight: 1,
		zIndex: 10
  });
}


//
//
//


//
//
//
function loadIcelandBaselines(map){
	map.data.loadGeoJson('https://raw.githubusercontent.com/bjarnirunarh/googlemapstest/master/data/json/iceland_baseline.json');

  // Set the stroke width, and fill color for each polygon in the geoJson
  map.data.setStyle({
    fillColor: '#FFFFFF',
    strokeColor: '#C0C0C0',
		strokeOpacity: 1,
		strokeWeight: 1,
		zIndex: 10
  });
}


//
//
//
function loadIcelandJurisdiction(map){
	map.data.loadGeoJson('https://raw.githubusercontent.com/bjarnirunarh/googlemapstest/master/data/json/iceland_jurisdiction.json');

  // Set the stroke width, and fill color for each polygon in the geoJson
  map.data.setStyle({
  	fillColor: '#FFFFFF',
    strokeColor: '#C0C0C0',
		strokeOpacity: 1,
		strokeWeight: 1,
		zIndex: 10
  });
}


//
//
//
function drawIcelandGridlines(map){
	var vertical=(lng2-lng1), horizontal=(lat2-lat1);

	// Create grid lines, vertical
	for(i=0; i<vertical; i++){
		var verticalLineCoordinates = [
			{lat: lat1, lng: lng1+i},
			{lat: lat2, lng: lng1+i}
		];

		var verticalLine = new google.maps.Polyline({
			map: map,
			path: verticalLineCoordinates,
			strokeColor: '#C0C0C0',
			strokeOpacity: 1,
			strokeWeight: 1,
			zIndex: 1
		});
	}

	// Create grid lines, horizontal
	for(i=0; i<(horizontal*2); i++){
		var horizontalLineCoordinates = [
			{lat: lat1+(i*0.5), lng: lng1},
			{lat: lat1+(i*0.5), lng: lng2}
		];

		var horizontalLine = new google.maps.Polyline({
			map: map,
			path: horizontalLineCoordinates,
			strokeColor: '#C0C0C0',
			strokeOpacity: 1,
			strokeWeight: 1,
			zIndex: 1
		});
	}
}


//
//
//
function createIcelandMarker(map){
	/*marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(78.90496827140028,15.278481406249993)
	});
	
	infowindow = new google.maps.InfoWindow({
		content:'<strong>Map of Iceland</strong><br>Iceland<br>'
	});
	
	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map,marker);
	});

	infowindow.open(map,marker);
	*/
}


/*
******************************************************************************************
******************************************************************************************
******************************** CALCULATION FUNCTIONS ***********************************
******************************************************************************************
******************************************************************************************
*/

//
//
//
function getExactCoordinates(coord, minutes, seconds, WNES){
	
	var newCoord;

	// Total decimals
	var decimals = ((minutes*60) + seconds)/3600;
	
	// West and South are negative deegrees
	if(WNES==='W' || WNES==='S' && coord < 0){
		newCoord = coord-decimals; 
		return -newCoord;
	}
	else{
		newCoord = coord+decimals; 
		return newCoord;
	}
}


//
// polygon is the field number
//
function isPointInPolygon(lat, lng, polygon){

	var file = getPolygonJsonFile(polygon);


}



/*
******************************************************************************************
******************************************************************************************
******************************** JSON HELP FUNCTIONS *************************************
******************************************************************************************
******************************************************************************************
*/

//
//
//
function getPolygonJsonFileName(polygon){
	var filenameStart = 'https://raw.githubusercontent.com/bjarnirunarh/googlemapstest/master/data/iceland_fields_json/iceland_field_';
	var temp = filenameStart.concat(polygon);
	var filenameEnd = '.json'
	var filename = temp.concat(filenameEnd);
	return filename;
}

function readGeoJsonFile(filename){
	$.getJSON(filename, function (data) {
    var items = [];
    $.each(data.features, function (key, val) {
      geometry = val.geometry;
  		properties = val.properties;
  		console.log(val.geometry.coordinates);
    });
  });
}



/*
******************************************************************************************
******************************************************************************************
******************************** LEAFLET PIP FUNCTIONS ***********************************
******************************************************************************************
******************************************************************************************
*/
var leafletPip = {
    bassackwards: true,
    pointInLayer: function(p, layer, first) {
        if (p instanceof L.LatLng) p = [p.lng, p.lat];
        else if (leafletPip.bassackwards) p = p.concat().reverse();

        var results = [];

        layer.eachLayer(function(l) {
            if (first && results.length) return;
            if ((l instanceof L.MultiPolygon ||
                 l instanceof L.Polygon) &&
                gju.pointInPolygon({
                    type: 'Point',
                    coordinates: p
                }, l.toGeoJSON().geometry)) {
                results.push(l);
            }
        });
        return results;
    }
};

