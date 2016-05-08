/*
** script.js
*/

// DOM LISTENER
google.maps.event.addDomListener(window, 'load', init_map);


// init map function
//
//
var map;
function init_map(){
	//https://notendur.hi.is/~brh12/hringormar/iceland_coordinates.json
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
		center:new google.maps.LatLng(64.963051,-19.020835000000034),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: stylesArray
	};
	
	var map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

	// Load GeoJSON data for ICELAND.
  map.data.loadGeoJson('https://notendur.hi.is/~brh12/hringormar/data/iceland_coordinates.json');

  // Set the stroke width, and fill color for each polygon in the geoJson
  map.data.setStyle({
    fillColor: '#FFFFF',
    strokeColor: '#FFFFF',
		strokeOpacity: 1,
		strokeWeight: 1
  });
	
	// constants for grid lines
	var lat1=61, lat2=69, lng1=-29, lng2=-8, vertical=lng2-lng1, horizontal=lat2-lat1;

	// Create grid lines, vertical
	for(i=0; i<vertical; i++)
	{
		var verticalLineCoordinates = [
			{lat: lat1, lng: lng1+i},
			{lat: lat2, lng: lng1+i}
		];

		var verticalLine = new google.maps.Polyline({
			map: map,
			path: verticalLineCoordinates,
			geodesic: true,
			strokeColor: '#C0C0C0',
			strokeOpacity: 1,
			strokeWeight: 1
		});
	};

	// Create grid lines, horizontal
	for(i=0; i<(horizontal*2); i++)
	{
		var horizontalLineCoordinates = [
			{lat: lat1+(i*0.5), lng: lng1},
			{lat: lat1+(i*0.5), lng: lng2}
		];

		var horizontalLine = new google.maps.Polyline({
			map: map,
			path: horizontalLineCoordinates,
			geodesic: true,
			strokeColor: '#C0C0C0',
			strokeOpacity: 1,
			strokeWeight: 1
		});
	}; 

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