/**
 * Created by Alvaro on 2/4/2015.
 */
var nutritionList = [];

$(function(){
    //loads the user selection
    $('#loadButton').click(function() {
        $.ajax({
            type: "GET",
            url: "cgi-bin/getData.php",
            data: {url: "http://kalathur.com/food/calories2.xml"},
            complete: function (xhr, result) {
                if (result != "success")
                    return;
                var response = xhr.responseXML;

                // for each <item> element

                $('#content').html('');

                $('#content').cycle('destroy');

                var tag = $('#tag').val().toUpperCase();
                var txt='';
                $(response).find("item").each(function () {
                    //Process xml file to display for viewer.
                    if ($(this).find("name").text().indexOf(tag) == 0) {
                        var name = $(this).find("name").text();

                        var size = $(this).find("size").text();
                        var cals = $(this).find("cals").text();
                        var carbs = $(this).find("carbs").text();
                        var prot = $(this).find("prot").text();
                        var weight = $(this).find("weight").text();
                        txt += "<div " + 'class="food-items"' + ">" + "<span>Name: " + name + "</span>" +
                            "<span>Size: " + size + "</span>" +
                            "<span>Calories: " + cals + "</span>" +
                            "<span>Carbs: " + carbs + "</span>" +
                            "<span>Protein: " + prot + "</span>" +
                            "<span>Weight: " + weight + "</span>" +
                            "</div>";
                    }




                });
                if(txt.length!=0){
                    $('#content').append(txt);
                }else{
                    $('#content').append("ITEM NOT IN THE LIST");
                }



            }
        });

    });


    $('#cycleButton').click(function(){
        $('#content').cycle({
            fx:'turnDown',
            delay:-2000,
            pause:true
        });

    });
});
