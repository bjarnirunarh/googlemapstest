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

	// Load GeoJSON data for ICELAND outlines
  loadIcelandOutlines(map);

  // Load GeoJSON data for ICELAND baseline
  loadIcelandBaselines(map);

  // Load GeoJSON data for ICELAND juristiction
  loadIcelandJurisdiction(map);
	
	// Draw gridlines around Iceland for Latitudes and Longitudes
	drawIcelandGridlines(map);
	
}


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
	
	var myOptions = {
		zoom:6, 
		center:new google.maps.LatLng(Lat,Lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: stylesArray
	};
	
	return new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
}


//
//
//
function loadIcelandOutlines(map){
	map.data.loadGeoJson('https://raw.githubusercontent.com/bjarnirunarh/googlemapstest/master/data/iceland_coordinates.json');

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
function loadIcelandBaselines(map){
	map.data.loadGeoJson('https://raw.githubusercontent.com/bjarnirunarh/googlemapstest/master/data/iceland_baseline.json');

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

}


//
//
//
function drawIcelandGridlines(map){
	var lat1=61, lat2=69, lng1=-29, lng2=-8, vertical=(lng2-lng1), horizontal=(lat2-lat1);

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
		var lng = lng1+i;
		console.log('['+ lng +','+ lat1 +']');
		console.log('['+ lng +','+ lat2 +']');
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
	if(WNES==='W' || WNES==='S'){
		newCoord = coord+decimals; 
		return -newCoord;
	}
	else{
		newCoord = coord+decimals; 
		return newCoord;
	}
}


//
//
//
function getDistanceCoordinates(lat0, lon0, dx, dy, NM){
	// Longitude is NORTH
	// Latitude is WEST

	// One Sjómíla in meters
	var NM_value = 1852;
	var meters = NM*NM_value;
	
	//Earth’s radius, sphere
 	R=6378137;

	lat = lat0 + ((180/Math.PI)*(dy/R));
 	lon = lon0 + ((180/Math.PI)*(dx/R))/(Math.Cos(Math.PI/180.0*lat0));
}







