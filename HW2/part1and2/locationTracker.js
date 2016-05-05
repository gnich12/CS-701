/**
 * Created by Alvaro on 1/27/2015.
 */
window.onload = init;
var url = "ws://localhost:8181/broadcast";
var socket;
var latitude,longitude;
var update=0; //counter to keep #updates from web socket client
// Google map
var map = null;

// Path
var path = [];

var lastMarker = null;

function init() {
    var connectButton = document.getElementById("start");
    connectButton.onclick = connectToServer;
}
function connectToServer() {
    // create the WebSocket object
    socket = new WebSocket(url);

    // event handlers for the WebSocket
    socket.onopen = handleOpenConnection;
    socket.onmessage = handleMessage;
    document.getElementById("start").disabled=true;
    document.getElementById("start").style.backgroundColor="gray";

};
function handleOpenConnection(){
    getGeoLocation();
};

/**
 * Displays the information retrieved from socket client
 * and displays the path in the map
 */
function handleMessage(event){
    var data = JSON.parse(event.data);
    showPath(data);
    update+=1;
    document.getElementById("update").innerHTML="Update: "+update;
    document.getElementById("curLat").innerHTML="Current Latitude: "+latitude;
    document.getElementById("curLon").innerHTML="Current Longitude: "+longitude;

}

function getGeoLocation(){

    var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
    };

    navigator.geolocation.getCurrentPosition(
        displayLocation, handleError, options);

}

function displayLocation(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    document.getElementById("update").innerHTML =
        "Update: " + update;
    document.getElementById("lat").innerHTML =
        "Starting Latitude: " + latitude;
    document.getElementById("lon").innerHTML =
        "Starting Longitude: " + longitude;
    var d=new Date(position.timestamp);
    console.log(d.toLocaleString());
    // Show the google map with the position
    showOnMap(position.coords);
}


function handleError(error) {
    switch(error.code) {
        case 1:
            alert("The user denied permission");
            break;
        case 2:
            alert("Position is unavailable");
            break;
        case 3:
            alert("Timed out");
            break;
    }
}

// initialize the map and show the position
function showOnMap(pos) {

    var googlePosition =
        new google.maps.LatLng(pos.latitude, pos.longitude);

    var mapOptions = {
        zoom: 15,
        center: googlePosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);

    // add the marker to the map
    var title = "Location Details";
    var content = "Lat: " + pos.latitude +
        ", Long: " + pos.longitude;

    addMarker(map, googlePosition, title, content);
}

function addMarker(map, latlongPosition, title, content) {

    var image='bird_red.png';
    var options = {
        position: latlongPosition,
        map: map,
        title: title,
        clickable: true,
        icon:image
    };
    var marker = new google.maps.Marker(options);

    var popupWindowOptions = {
        content: content,
        position: latlongPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function() {
        popupWindow.open(map);
    });

    return marker;
}
function showPath(data)
{
    path = [];

    // first point
    var latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    //checks the updates counter to keep the bird flying inside the US.
    if(update>200){
        latitude += data.lat;
        longitude += data.lon;
    }else if(update>500) {
        latitude -= data.lat;
        longitude -= data.lon;
    }else if(update>1000){
        latitude -= data.lat;
        longitude += data.lon;
    }else if(update>2000){
        latitude = data.lat;
        longitude += data.lon;
    }else if(update>2500){
        latitude -= data.lat;
        longitude += data.lon;
    }else{
        latitude += data.lat;
        longitude -= data.lon;
    }

    // next point
    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);


    var line = new google.maps.Polyline({
        path : path,
        strokeColor : '#0000ff',
        strokeOpacity : 1.0,
        strokeWeight : 3
    });
    line.setMap(map);

    map.panTo(latlong);

    if (lastMarker)
        lastMarker.setMap(null);
    // add the new marker
    lastMarker = addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
}
