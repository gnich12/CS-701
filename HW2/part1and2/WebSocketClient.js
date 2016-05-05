/**
 * Created by Alvaro on 1/26/2015.
 */
window.onload = init;
var url = "ws://localhost:8181/broadcast";
var socket;
var lat,lon;

// register the event handlers for buttons

function init() {
    var connectButton = document.getElementById("start");
    connectButton.onclick = connectToServer;
};

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
    sendToServer();
};


/**
 * It sends a Json object that
 * includes the latitude and longitude
 */
function sendToServer() {
    setInterval(function(){
        if (socket) {

            lat = Math.random() / 100;
            lon = Math.random() / 100;
            var data = JSON.stringify({lat: lat, lon: lon});
            socket.send(data);
        } else {
            log("Not Connected");
        }

    },5000);

}

/**
 * Displays the message received to
 * the server
 * @param event
 */
function handleMessage(event){
    var data = JSON.parse(event.data);
    log("Received:" +" Latitude: "+ data.lat +
    " Longitude: " + data.lon);
}

// log messages in the HTML document
function log(message) {
    var pre = document.createElement("p");
    pre.innerHTML = message;
    var status = document.getElementById("displayData2");
    status.appendChild(pre);
}