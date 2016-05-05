/**
 * Created by Alvaro on 2/11/2015.
 */

// load initial data
$('#map').live( "pageinit", function(e){
    loadMapData("Boston MA","New York NY");
});

// on page initialization
$( "#map" ).live( "pageinit", function(){

    $("#from, #to").bind( "change", function(event) {
        var tagFrom = $('#from').val();
        var tagTo= $('#to').val();
        //checks if there is change in the forms
        if (tagFrom.length> 0 && tagTo.length>0)
        {
            loadMapData(tagFrom,tagTo);
        }
    });

})

function loadMapData(from,to) {
    var uri = "http://open.mapquestapi.com/directions/v2/route?key=Fmjtd|luu821u7nd%2Caa%3Do5-942whf&from=" +encodeURI(from)+ "&to=" +encodeURI(to);
    $('#map-quest').html('').append('<li data-role="list-divider">Trip Summary</li>');
    $.getJSON(uri,function(data){
        $('#map-quest').append("<li>Distance: "+(data.route.distance).toFixed(2)+"m "+ "Time: "+data.route.formattedTime+"</li>");
        $('#map-quest').append('<li data-role="list-divider">Turn by Turn Directions</li>');
        var txt='';
        $.each(data.route.legs[0].maneuvers,function(index, current){
            txt=txt+'<li><img class="ui-li-icon profile"'+'src="'+current.iconUrl+'">'+
            '<a href="'+current.mapUrl+'" target="_blank">'+current.narrative+" ["+(current.distance).toFixed(2)+"m]"+'</a>';
            //console.log(txt);
        });
        $( "#map-quest" ).append(txt).listview( "refresh", true );
        $.mobile.changePage( $("#map") );
    });

}