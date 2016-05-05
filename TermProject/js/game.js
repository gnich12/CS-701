/**
 * Created by Alvaro on 2/13/2015.
 * Term project BU METCIS 701
 *
 */
//JSON object that contains the solution for color game
var colorSolution =
{
    "secondary": [
        {
            "color": "Yellow",
            "solution": [
                "rg", "gr"
            ],
            "class": "yellow",
            "hint": ["Combination of two primary colors: red and ?", "Combination of two primary colors: green and ?"]
        },
        {
            "color": "Cyan",
            "solution": [
                "bg", "gb"
            ],
            "class": "cyan",
            "hint": ["Combination of two primary colors: blue and ?", "Combination of two primary colors: green and ?"]
        },
        {
            "color": "Magenta",
            "solution": [
                "br", "rb"
            ],
            "class": "magenta",
            "hint": ["Combination of two primary colors: red and ?", "Combination of two primary colors: red and ?"]
        }
    ],
    "terciary": [
        {
            "color": "Rose",
            "solution": [
                "rbr",
                "brr"
            ],
            "class": "rose",
            "hint": ["red + blue + ?",
                "blue + red + ?"]
        },
        {
            "color": "Violet",
            "solution": [
                "rbb",
                "brb"
            ],
            "class": "violet",
            "hint": ["red + blue + ?",
                "blue + ? + blue"]
        },
        {
            "color": "Azure",
            "solution": [
                "gbb",
                "bgb"
            ],
            "class": "azure",
            "hint": ["green + blue + ?",
                "blue + green + ?"]
        },
        {
            "color": "Spring Green",
            "solution": [
                "gbg",
                "bgg"
            ],
            "class": "spring",
            "hint": ["green + ? + green",
                "blue + green + ?"]
        },
        {
            "color": "Chartreuse",
            "solution": [
                "rgg",
                "grg"
            ],
            "class": "chartreuse",
            "hint": ["red + green + ?",
                "green + red + ?"]
        }
    ],
    "key": "", //use as a variable storage
    "property": "" //use as variable storage

};

var colorCode = ["Yellow", "Cyan", "Magenta", "Rose", "Violet", "Spring Green", "Azure", "Chartreuse"];
//api service to produce random word for game and secret code.
var apiUri = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
var userColorInput = '', gameWord = "", prizeCode = '';
var count = 0, lifes = 4;
var prize = '<div id="pvid"><iframe frameborder="0" width="560" height="315" src="http://www.dailymotion.com/embed/video/x2hz4qi?autoPlay=1" allowfullscreen></iframe><br /><a href="http://www.dailymotion.com/video/x2hz4qi_vine-cat-thug-life_animals" target="_blank">vine cat - Thug life</a> <i>by <a href="http://www.dailymotion.com/giraftv" target="_blank">giraftv</a></i></div>';


$(function () {
    /**
     * Controller for the menu option how to and about
     * it will show the content for any of the options
     * but it will if any of them is open ex if how is active
     * and the user click about it will hide how and it will display
     * about.
     * */
    $('header ul li').on("click", function () {
        var playButton = "<button id='play'>Let's Play</button>";
        var playHow = "<button id='playHow'>Let's Play</button>";
        if ($(this).is('li:eq(0)')) {
            $('#mainContent').find('.about').hide();
            $('#prize').hide('blind', {duration: 1000});
            if ($('.how').find('#playHow').is('button')) {
                $('.how').show('slide', {duration: 1000});
            } else {
                $('.how').show('slide', {duration: 1000}).append(playHow);
            }

            $(this).addClass('active').next().removeClass('active');
        }
        else {
            $('#mainContent').find('.how').hide();
            $('#prize').hide('slide', {duration: 1000});
            if ($('.about').find('#play').is('button')) {
                $('.about').show('slide', {duration: 1000});
            } else {
                $('.about').show('slide', {duration: 1000}).append(playButton);
            }
            $(this).addClass('active').prev().removeClass('active');
        }
    });

    /**
     * Controls the button that are injected inside
     * how and about menu options
     */
    $('#mainContent, #play').on("click", function () {

        if ($(this).parent('.about')) {
            $('.about').hide("slide");
            $('#prize').show("blind");
        }

    });


    $('#mainContent, #playHow').on("click", function () {

        if ($(this).parent('.how')) {
            $('.how').hide("slide");
            $('#prize').show("slide");
        }

    });
    //###################### OPTION 1 ##################################################
    /**
     * It controls the options for the game
     * when active it will inject an audio element
     * to the footer
     * * */
    $('#accordion').accordion({
        heightStyle: "content",
        active: false,
        collapsible: true,
        activate: function (event, ui) {
            if (ui.newHeader.text() === "Option 1 - Color Code Game" ||
                ui.newHeader.text() === "Option 2 - Find the Secret Word") {
                if (!$('#tune').find('#op1').is("audio")) {
                    $('#tune').append('<label>Mission Impossible Tune</label><audio id="op1" src="assets/mis_theme.mp3" controls autoplay></audio>');
                }
            }
        }
    });

    /**
     * It binds the three buttons of the color game, it will
     * check for the correspondent color if the button is click. also check
     * if has click more than three times.*/
    $('#colorOne,#colorTwo,#colorThree').on('click', function (event) {
        count += 1;

        if (count <= 3) {
            if ($(this).val() === "r") {
                $('.blocks').append('<div class="red">' + "RED" + '</div>');

            } else if ($(this).val() === "g") {
                $('.blocks').append('<div class="green">' + "GREEN" + '</div>');

            } else {
                $('.blocks').append('<div class="blue">' + "BLUE" + '</div>');

            }
            userColorInput += $(this).val();
        } else {
            genMsg('', '.control', "It can not be more than 3 colors");
        }
    });


    $('#color').append(pickColor());
    $('#clearInput').on('click', function () {
        $('.blocks').html('');
        count = 0;
        userColorInput = '';
    });

    $('#cHint').on('click', function () {
        var c = getHintColor(getKey(), getProperty());
        var r = (Math.floor((Math.random() * 2) + 1)) % 2 === 0 ? 0 : 1;
        genMsg("hint", '#gameColors', c[r]);
    });

    $('#check ').on("click", function () {
        genPrizeCode(1, userColorInput);
    });

    //################################ OPTION 2 ######################################################
    // it disable the buttons when page is load
    $('#wordHint').attr("disabled", "disabled");
    $('#genNewWord').attr("disabled", "disabled");
    $('#checkWord').attr("disabled", "disabled");

    /**
     * Once the user click start i will generate the word for the game
     * and enabling the game buttons.
     */
    $('#genWord').on('click', function () {
        $('#wordHint').removeAttr("disabled");
        $('#genNewWord').removeAttr("disabled");
        $('#checkWord').removeAttr("disabled");
        $.getJSON(apiUri, function (data) {
            setGameWord(data.word);
            genWordGame(data.word);

        });

    });

    $('#wordHint').on('click', function () {
        var h = getWord();
        genMsg("hint", '#gameWord', h.substr(0, Math.floor((Math.random() * h.length) + 1)));
    });

    $('#genNewWord').on('click', function (event) {
        $('#dragTarget ul').html('');
        $('#dragWord').html('');
        $.getJSON(apiUri, function (data) {
            setGameWord(data.word);
            genWordGame(data.word);

        });
        event.preventDefault();
    });

    /**
     * Checks the user input by reading the values of
     * list to form the word
     * */
    $('#checkWord').on('click', function (event, ui) {
        var bucket = '';
        $('#dragTarget ul').find('li').each(function (index) {
            bucket += $(this).text();

        });
        genPrizeCode(2, bucket.toLowerCase());

    })

    //#####################################################################
    $('#reedem').on('click', function (event) {

        if (validatePrizeCode($('#inputCode').val())) {
            $('#prize').hide('slide', {duration: 1000});
            $('.fun').show('slide', {duration: 1000}).append(prize);
        } else {

            genMsg('', '#prize', "Wrong Code");
        }


    });

    $('#again').on('click', function (event) {
        location.reload();
    });

});
function setGameWord(w) {
    gameWord = w;
}
function getWord() {
    return gameWord;
}
function setKey(key, val) {//key value pair color,property(primary or seconday etc..)
    colorSolution.key = key;
    colorSolution.property = val;
};
function setPrizeCode(p) {
    prizeCode = p;
}
function getPrizeCode() {
    return prizeCode;
}
function getKey() {
    return colorSolution.key;
}
function getProperty() {
    return colorSolution.property;
}

/**
 * This functions generates the message dialog depending on the
 * type and loccation of where it will be injected, it displays
 * error, hints, congratulations and fail messages
 * @param type
 * @param loc
 * @param msg
 */

function genMsg(type, loc, msg) {
    var error = '<div id="errorMessage" style="display: none;" title="Warning"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:4px 10px 20px 0;"></span>'
        + '%data%' + '</p></div>';
    var congrats = '<div id="congratMessage" style="display: none;" title="Congratulations"><p><span class="ui-icon ui-icon-info " style="float:left; margin:4px 10px 20px 0;"></span>'
        + 'Secret code is <br> ' + '<span class="secret-code">%data%</span>' + '</p></div>';
    var hintMsg = '<div id="hintMessage" style="display: none;" title="Hint"><p><span class="ui-icon ui-icon-info " style="float:left; margin:4px 10px 20px 0;"></span>%data%</p></div>';
    var fail = '<div id="fun" style="display: none;" title="Fail!!!"><iframe frameborder="0" width="560" height="315" src="//www.dailymotion.com/embed/video/x2241lu?autoPlay=1" allowfullscreen></iframe><br /><a href="http://www.dailymotion.com/video/x2241lu_ha-ha-nelson_fun" target="_blank">Ha Ha Nelson</a> <i>by <a href="http://www.dailymotion.com/Hollywood2NY" target="_blank">Hollywood2NY</a></i></div>';
    
    if (type === "prize") {
        $.getJSON(apiUri, function (data) {
            setPrizeCode(data.word);
            $(loc).append(congrats.replace("%data%", data.word));
            $("#congratMessage").dialog({
                resizable: false,
                height: 250,
                modal: true,
                show: {
                    effect: "shake",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                },
                buttons: {
                    ok: function () {
                        reset();
                        $(this).dialog("close");
                    }
                }
            });
        });


    } else if (type === "hint") {
        $(loc).append(hintMsg.replace("%data%", msg));
        $("#hintMessage").dialog({
            resizable: false,
            height: 250,
            modal: true,
            show: {
                effect: "shake",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            buttons: {
                ok: function () {
                    $(this).dialog("close");
                }
            }
        });
    } else if (type === "fail") {
        $(loc).append(fail);
        $("#fun").dialog({
            resizable: false,
            height: 600,
            width: 575,
            modal: true,
            show: {
                effect: "shake",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            buttons: {
                TryAgain: function (loc) {
                    reset();
                    $(this).dialog("close");
                    event.prevenDefault;

                }
            }
        });
    }
    else {
        $(loc).append(error.replace("%data%", msg));
        $("#errorMessage").dialog({
            resizable: false,
            height: 250,
            modal: true,
            show: {
                effect: "shake",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            buttons: {
                ok: function () {
                    $(this).dialog("close");
                }
            }
        });

    }

}
/*
 * It resets all the components
 * of the game*/
function reset() {
    $('#check').removeAttr("disabled");
    $('.blocks').html('');
    $('#color').html('').append(pickColor());
    $('#wordHint').attr("disabled", "disabled");
    $('#genNewWord').attr("disabled", "disabled");
    $('#checkWord').attr("disabled", "disabled");
    $('#dragTarget ul').html('');
    $('#dragWord').find('div').each(function (index) {
        $(this).html('');
    });
    $("#genWord").removeAttr("disabled");
    $(".lifes").find("li").each(function (index) {
        $(this).show();
    });

    count = 0;
    lifes = 4;
}
/**
 * Checks if the code input by the user matches the
 * word generated by the api
 * @param p
 * @returns {boolean}
 */

function validatePrizeCode(p) {

    if (p.length != 0 && getPrizeCode().length != 0) {
        if (p === getPrizeCode()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

/**
 * Generates the prize code depending on the option
 * selected by the user. if 1 is the color game and 2 the word
 * game
 * @param typeGame
 * @param sol
 */

function genPrizeCode(typeGame, sol) {

    if (typeGame === 1) {
        if (validateColor(sol, getKey()) === true) {
            genMsg('prize', '#gameWord', "");
        } else {
            $('.blocks').html('');
            count = 0;
            userColorInput = '';
            if (lifes != 1) {
                $('.lifes li:eq(' + lifes + ')').hide("slow");
                lifes -= 1;
                $('#gameColors').effect("shake");

            } else {
                $('.lifes li:eq(1)').hide("slide");
                $('#check').attr('disabled', 'disabled');
                genMsg("fail", '#gameColors', "fail!!!!!");

            }

        }
    } else {

        if (getWord().toLowerCase() != sol) {
            if (lifes != 1) {
                $('.lifes li:eq(' + lifes + ')').hide();
                lifes -= 1;
                genMsg("", '#gameWord', "Thats not the correct word!!!");

            } else {
                $('.lifes li:eq(1)').hide();
                $('#genWord').attr('disabled', 'disabled');
                genMsg("fail", '#gameWord', "fail!!!!!");

            }

        } else {
            genMsg("prize", '#gameWord', "");
        }

    }

}

/**
 * Generates the color for the user to solve
 * by random choosing a color from the solution object
 * @returns {string}
 */

function pickColor() {
    var random = Math.floor((Math.random() * colorCode.length) + 1);
    var txt = '';

    if (random < colorCode.length / 2) {
        for (d in colorSolution.secondary) {
            if (colorSolution.secondary[d].color === colorCode[random - 1]) {
                setKey(colorSolution.secondary[d].color, "secondary");
                return txt = '<button class="' + colorSolution.secondary[d].class + '">' + colorSolution.secondary[d].color + '</button>';
            }
        }
    } else {
        for (t in colorSolution.terciary) {
            if (colorSolution.terciary[t].color === colorCode[random - 1]) {
                setKey(colorSolution.terciary[t].color, "terciary");
                return txt = '<button class="' + colorSolution.terciary[t].class + '">' + colorSolution.terciary[t].color + '</button>';
            }
        }
    }

}
/**
 * Generates the hints for the color game by
 * checking the key and property of the color
 * @param key
 * @param prop
 * @returns {*}
 */

function getHintColor(key, prop) {
    if (prop === "secondary") {
        for (d in colorSolution.secondary) {
            if (colorSolution.secondary[d].color === key) {
                return colorSolution.secondary[d].hint;
            }

        }
    } else {
        for (s in colorSolution.terciary) {
            if (colorSolution.terciary[s].color === key) {
                return colorSolution.terciary[s].hint;

            }
        }
    }
}
/**
 * It validates the color solution input by user
 * by matching the key and property of the color from
 * json object
 * @param sol
 * @param key
 * @returns {boolean}
 */

function validateColor(sol, key) {

    if (getProperty() === "secondary") {
        for (d in colorSolution.secondary) {
            for (e in colorSolution.secondary[d].solution) {
                if (colorSolution.secondary[d].color === key && (colorSolution.secondary[d].solution[e] === sol ||
                    colorSolution.secondary[d].solution[e + 1] === sol)) {
                    return true;
                }
            }
        }
    } else {
        for (s in colorSolution.terciary) {
            for (e in colorSolution.terciary[s].solution) {
                if (colorSolution.terciary[s].color === key && (colorSolution.terciary[s].solution[e] === sol ||
                    colorSolution.terciary[s].solution[e + 1] === sol)) {
                    return true;
                }
            }
        }
    }


    return false;
}

/**
 * It generates the random word for the game
 * by shuffling the letters that are going presented
 * for the user.
 * @param w
 */

function genWordGame(w) {
    var str = w, txt = '', st = '';
    var gen = [];
    var duplicates = [];

    /**
     * this loop shuffles the letters by random
     * picking a letter from the generated word and adding it
     * to a new array. to avoid duplicate numbers
     * generated by the random generator, it will check
     * an array of duplicates, to generate a new number if there
     * is a duplicate.
     */

    while (gen.length != str.length) {
        random = Math.floor((Math.random() * str.length) + 1);
        if (duplicates.indexOf(random) == -1) {
            duplicates.push(random);
            gen.push(str[random - 1]);

        }
    }

    /**
     * This loop generates the tiles boxes where the letters are going
     * to be drop and also binds the event control draggable and droppable
     * and also disable the start button once the word is generated.
     */
    for (v in gen) {
        txt = '<div id="#draggable' + v + '">' + gen[v].toUpperCase() + '</div>';
        st = '<li id="sqr' + v + '">' + '</li>';

        $(txt).append(gen[v]).addClass("tiles").draggable();

        $('#dragWord').append(txt).find('div').each(function (index) {
            $(this).addClass('tiles');
        }).draggable({opacity: 0.35, snap: true, snapMode: 'inner', helper: 'clone'});

        $('#dragTarget ul').sortable();
        $("#dragTarget ul").append(st).find(('li')).droppable({
            accept: ".tiles",
            drop: function (event, ui) {
                if ($(this).text().length === 0) {
                    $(this).text(ui.draggable.text()).appendTo(this).css("color", "orange");
                    ui.draggable.hide();
                }

            }

        }).sortable({items: "li"}).disableSelection();

    }

    $("#genWord").attr("disabled", "disabled");
}