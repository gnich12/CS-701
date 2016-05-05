/**
 * Created by Alvaro on 2/3/2015.
 */
var nutritionList = [];

$(function() {
    // disable the input until data is loaded
    $('#target').attr("disabled", "disabled");
    // make the ajax request
    $.ajax({
        type:"GET",
        url : "cgi-bin/getData.php",
        data : {url : "http://kalathur.com/food/calories2.xml"},
        complete : function(xhr, result) {
            if (result != "success")
                return;
            var response = xhr.responseXML;

            // for each <item> element
            // process each xml element and adds it to a JSON object
            $(response).find("item").each (function() {
                var name = $(this).find("name").text();
                var size = $(this).find("size").text();
                var cals = $(this).find("cals").text();
                var carbs=$(this).find("carbs").text();
                var prot=$(this).find("prot").text();
                var weight=$(this).find("weight").text();
                var item =
                {
                    label: name,
                    value: name,
                    data: {
                        name: name, size: size,
                        cals: cals,carbs:carbs,prot:prot,weight:weight}};

                nutritionList.push(item);
            });
            console.log(nutritionList);
        }
    });
    // enable the input
    $('#target').removeAttr("disabled");

    // setup autocomplete options
    var options = {
        source : selectEntries,
        select : makeSelection
    };
    $('#target').autocomplete(options);
});

// request.term -- user entry
// callback -- to return array of values
function selectEntries (request, callback) {

    var result = [];
    // filter the data for matching entries
    result = $.grep(nutritionList,
        function(value, index){
            return  (value.label.toLowerCase().indexOf(
                request.term.toLowerCase()) == 0);
        });
    // return the results
    callback(result);
}
// when a selection is make
function makeSelection(event, ui) {

    $('#name').val(ui.item.data.name);
    $('#size').val(ui.item.data.size);
    $('#cals').val(ui.item.data.cals);
    $('#carbs').val(ui.item.data.carbs);
    $('#proteins').val(ui.item.data.prot);
    $('#weight').val(ui.item.data.weight);
}