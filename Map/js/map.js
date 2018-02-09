$(document).ready(function(){
  var geocoder = new google.maps.Geocoder();				
  var myLatLng = new google.maps.LatLng(33.4936111, -117.1475);
  var mapOptions = {zoom: 8, center: myLatLng, mapTypeId: google.maps.MapTypeId.ROADMAP}
  var map = new google.maps.Map($("#map").get(0), mapOptions);

  //When page loads, loop through each place and add marker on the map
  var places = $("#links li");
  places.each(function(idx, li) {
    var place = $(li);
    var placeName = place.text();
    placeMarker(placeName);
  });

  //Add marker to map if any of the place is clicked from the list
  $("#links a").click(function() {
    var placeName = $(this).text();
    placeMarker(placeName);
  });

  //Function to add marker on the map for the placeName
  function placeMarker(placeName){
    geocoder.geocode({address: placeName}, function(results) {
      console.log(results[0]);
      new google.maps.Marker({
        position: results[0].geometry.location,
        map: map
      });
      
      // Create our info window content   
      var infoWindowContent = '<div class="info_content">' +
        '<h3>'+ placeName +'</h3>' +
        '<p>'+ results[0].formatted_address+'</p>' +
        '</div>';

      // Initialise the infoWindow
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
            
      // Add a marker to the map based on our coordinates
      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        title: 'London Eye, London'
      });

      // Display our info window when the marker is clicked
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
      });
    });
  }

});