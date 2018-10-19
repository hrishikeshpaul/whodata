function initMap() {
	var myLatLng = {lat: -25.363, lng: 131.044};
	var image = '../images/stadiumiconcircle.png';


	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: myLatLng
	});

	var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

	var infowindow =  new google.maps.InfoWindow({
		content: "<div style='float:left'><img src='http://i.stack.imgur.com/g672i.png'></div><div style='float:right; padding: 10px;'><b>Title</b><br/>123 Address<br/> City,Country</div>",
		map: map,
		position: myLatLng
	});
	 
	infowindow.close();

// show infowindow when mouse-over
	marker.addListener('mouseover', function() {
    infowindow.open(map, this);
	});

//hide the infowindow when user mouses-out
marker.addListener('mouseout', function() {
    infowindow.close();
});
}
