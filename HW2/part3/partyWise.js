/**
 * Created by Alvaro on 1/30/2015.
 */
window.onload = init;

var KEY="senator";
var fname='partyList.xml';
var src,target,sourceId,msg;

function init() {
    if(window.localStorage.length===0){
        //perform ajax call
        loadCandidates(fname);
    }else{
        loadFromLocal(KEY);
    }

    src=document.getElementById("members");
    target=document.getElementById("dropLists");
    msg = document.getElementById("msg");

    // Add event handlers for the source
    src.ondragstart = dragStartHandler;
    src.ondragend = dragEndHandler;
    src.ondrag = dragHandler;

    // Add event handlers for the target
    target.ondragenter = dragEnterHandler;
    target.ondragover = dragOverHandler;
    target.ondrop = dropHandler;

    target.addEventListener("storage",recoverSession(),false);


}
function dragStartHandler(e) {
    sourceId = e.target.id;
    e.target.classList.add("dragged");
}

function dragEndHandler(e) {
   // msg.innerHTML = "Drag Ended";
    var elems = document.querySelectorAll(".dragged");
    for(var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dragged");
    }
}

function dragHandler(e) {
    msg.innerHTML = "Dragging " + e.target.id;
}

function dragEnterHandler(e) {
    msg.innerHTML = "Drag Entering " + e.target.id;
    e.preventDefault();
}

function dragOverHandler(e) {
    msg.innerHTML = "Drag Over " + e.target.id;
    e.preventDefault();
}
/**
 * handles where to drop the drag object
 * also checks for the following cases
 * case 1: if the candidate has already been voted
 * case 2: if its the same party as the candidate
 * @param e
 */
function dropHandler(e) {
    var sourceElement = document.getElementById(sourceId);
    var newElement = sourceElement.cloneNode(true);
    var voteTarget=document.getElementById(e.target.id);

    if(hasBeenVoted(sourceElement.innerText)){
        msg.innerHTML="You already voted for that candidate";
    }else{

        if(checkPartyArea(sourceElement.innerText, e.target.id)) {
            if (newElement.hasAttribute("draggable")) {
                newElement.setAttribute("draggable", "false");
            }

            voteTarget.appendChild(newElement);
            storeSession(e.target.id,newElement);
        }
        else {
            msg.innerHTML="You cant vote for this candidate. Its not the correct party";
        }
    }
    e.preventDefault();
}

/**
 * checks if the candidate is already been voted
 * @param name
 * @returns {boolean}
 */
function hasBeenVoted(name){
    var data=JSON.parse(window.localStorage.getItem(KEY));
    var chk=false;
    for (var d in data) {
        if (data[d].name === name) {
            if (data[d].vote != "false") {
                chk=true;
            }
        }
    }
    return chk;
}

/**
 * it checks whether the drag object its in the
 * correct area
 * @param name
 * @param p
 * @returns {boolean}
 */
function checkPartyArea(name, p){
    var data=JSON.parse(window.localStorage.getItem(KEY));
    var chk=false;

    for (var d in data) {
        if (data[d].party === p) {
            if (data[d].name === name) {
                chk = true;
                updateValue(name,p,"false");
            }
        }
    }
    return chk;
}

/**
 * updates the values of the candidates
 * if they have been voted
 * @param name
 * @param p
 * @param value
 */
function updateValue(name,p,value){
    var data=JSON.parse(window.localStorage.getItem(KEY));
    for (var d in data) {
        if (data[d].party === p) {
            if (data[d].name === name) {
                data[d].vote="true";

            }
        }
    }
    storeToLocal(data);
}

/**
 * Stores the session of the application.
 * @param key
 * @param v
 */
function storeSession(key,v){
    var candidateInfo=[];
    var storage;

    if(window.sessionStorage.getItem(key)){
        storage=JSON.parse(window.sessionStorage.getItem(key));
        storage[0].info.push(v.innerText);
        window.sessionStorage.setItem(key,JSON.stringify(storage));
    }else{
        candidateInfo.push({"info":[v.innerText]});
        window.sessionStorage.setItem(key,JSON.stringify(candidateInfo));
    }

}

/**
 * Recovers the last point in the application
 * by checking if the key is available either
 * democrat or republican
 */
function recoverSession(){
    var d,txt="";
    var targetDOMDemo=document.getElementById("democrat");
    var targetDOMRep=document.getElementById("republican");


   if(window.sessionStorage.getItem("democrat")){
       d=JSON.parse(window.sessionStorage.getItem("democrat"));
       txt="";
       for (var v in d[0].info){
           txt=txt+"<li>"+d[0].info[v]+"</li>";
       }

       targetDOMDemo.innerHTML=txt;
   }
    if(window.sessionStorage.getItem("republican")){
        d=JSON.parse(window.sessionStorage.getItem("republican"));
        txt="";
        for (var v in d[0].info){
            txt=txt+"<li>"+d[0].info[v]+"</li>";
            console.log(txt);
            console.log(targetDOMDemo);
        }

       targetDOMRep.innerHTML=txt;
    }

}
/**
 * Performs the ajax call to load the data to the local
 * storage and populates the list of candidates by calling
 * and xml file.
 * */
function loadCandidates(fname) {
    var xmlhttp;
    var txt, xx, x, i, cname, cparty;
    var jsonData = [];
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            txt = "";
            x = xmlhttp.responseXML.documentElement.getElementsByTagName(KEY);
            for (i = 0; i < x.length; i++) {

                txt = txt + "<li draggable='true' id=" + 'c' + i + '' + ">";
                xx = x[i].getElementsByTagName("name");
                {
                    try {
                        txt += xx[0].firstChild.nodeValue + "</li>";

                        cname = xx[0].firstChild.nodeValue;

                    }
                    catch (er) {
                        txt = txt + "<li>ffff</li>";
                    }
                }
                xx = x[i].getElementsByTagName("party");
                {
                    try {

                        cparty = xx[0].firstChild.nodeValue;
                    }
                    catch (er) {
                        txt = txt + "<li>ffff</li>";
                    }
                }
                //Creates a json object to store
                jsonData.push({"name": cname, "party": cparty, "vote": "false"});

            }

            storeToLocal(jsonData);
            document.getElementById('members').innerHTML = txt;
            document.getElementById('msg').innerHTML = "Loaded "+ x.length+" candidates from AJAX";
        }
    }
    xmlhttp.open("GET", fname, true);
    xmlhttp.send();
}

function storeToLocal(value){
    window.localStorage.setItem(KEY,JSON.stringify(value));
}

/**
* Populates the list of candidates from local storage
*/

function loadFromLocal(key){
    var data=JSON.parse(window.localStorage.getItem(key));
    var display=document.getElementById('members');
    var msg=document.getElementById("msg");
    var elem="";
    for (var d in data){
        elem=elem+"<li draggable='true' id="+'c'+d+''+">"+data[d].name+"</li>";

    }
    display.innerHTML=elem;
    msg.innerHTML="Loaded from Local Storage";

}
