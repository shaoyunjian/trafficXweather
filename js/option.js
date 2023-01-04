let stationDiv = document.getElementById("station")
let start = document.getElementById("start")
let terminal = document.getElementById("terminal")

let station = {
    "0":"南港站",
    "1":"台北站",
    "2":"板橋站",
    "3":"桃園站",
    "4":"新竹站",
    "5":"苗栗站",
    "6":"台中站",
    "7":"彰化站",
    "8":"雲林站",
    "9":"嘉義站",
    "10":"台南站",
    "11":"左營站",
}

// creat element
function createElement(appendBlock, elementStyle, elementName, elementText = null){
    element = document.createElement(elementStyle);
    element.setAttribute("id",elementName);
    element.setAttribute("class",elementName);     
    if (elementStyle == "img"){
        element.src = elementText;
    }
    else{
        element.textContent = elementText;
    }
    appendBlock.appendChild(element);
    globalThis.elementName = document.getElementById(elementName)
}

 
createStation()
function createStation(){
    createElement(start, "div", "startTitle","起始站：")
    createElement(start, "div", "startStation","請選擇")
    createElement(terminal, "div", "terminalTitle","終點站：")
    createElement(terminal, "div", "terminalStation","請選擇")
    createElement(stationDiv, "div", "stationStartNameDiv")
    createElement(stationDiv, "div", "stationterminalNameDiv")
    for (i=0;i<Object.keys(station).length;i++){
        createElement(stationStartNameDiv, "div", `stationStartName${i}`, station[i])
        eval(`stationStartName${i}`).setAttribute("class","stationStartName");
        element.setAttribute("onclick","startStationClick(this)"); 
        createElement(stationterminalNameDiv, "div", `stationterminalName${i}`, station[i])
        eval(`stationterminalName${i}`).setAttribute("class","stationterminalName");
        element.setAttribute("onclick","terminalStationClick(this)"); 
    }
}
// Click to show station
document.addEventListener("click", function () {
    closeStation();
}, false);
start.addEventListener("click", function (ev) {
    // clickSearchBarCount();
    showStartStation();    
    ev.stopPropagation();
}, false);
terminal.addEventListener("click", function (ev) {
    // clickSearchBarCount();
    showTerminalStation();    
    ev.stopPropagation();
}, false);

// click to show on searchbar
stationStartNameDiv.addEventListener("click", function (ev) {
    console.log("in1")
    startStationChosen();
    closeStation()
    ev.stopPropagation();
}, false);

stationterminalNameDiv.addEventListener("click", function (ev) {
    terminalStationChosen();
    closeStation()
    ev.stopPropagation();
}, false);

// ====
function startStationChosen(){
    document.getElementById("startStation").textContent = startStationChosenText;
    startStationValue = startStationChosenText
}
function terminalStationChosen(){
    document.getElementById("terminalStation").textContent = terminalStationChosenText;
    terminalStationValue = terminalStationChosenText
}

let startStationChosenText = "";
function startStationClick(element){ 
    startStationChosenText = element.innerHTML;
}
let terminalStationChosenText = "";
function terminalStationClick(element){ 
    terminalStationChosenText = element.innerHTML;
}

// Station show or none
function closeStation(){
    stationStartNameDiv.style.display = "none";
    stationterminalNameDiv.style.display = "none";
}
function showStartStation(){
    stationStartNameDiv.style.display = "grid";
}
function showTerminalStation(){
    stationterminalNameDiv.style.display = "grid";
}



function show(){
    stationStartNameDiv.style.display = "grid";
}
function test2(){
    stationterminalNameDiv.style.display = "none";
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// createElement(stationDiv, "div", "searchChoose")
// createElement(searchChoose, "div", "searchRailway","台鐵")
// createElement(searchChoose, "div", "searchHighspeedrail","高鐵")
// createElement(searchChoose, "div", "searchWeather","天氣")

let searchRailway = document.getElementById("searchRailway")
let searchHighspeedrail = document.getElementById("searchHighspeedrail")
let searchWeather = document.getElementById("searchWeather")

searchRailway.addEventListener("click",clickRailway)
searchHighspeedrail.addEventListener("click",clickHighspeedrail)
searchWeather.addEventListener("click",clickWeather)

let startStationValue = null
let terminalStationValue = null
let searchValue = null
let data = {
    "start":startStationValue,
    "terminal":terminalStationValue,
    "search":searchValue
}

function clickRailway(){
    searchValue = "railway"
    searchRailway.style.backgroundColor = "#ff4242"
    searchHighspeedrail.style.backgroundColor = "#fd9d9d"
    searchWeather.style.backgroundColor = "#fd9d9d"
    data = createData()
    getRailway(data)    
}
function clickHighspeedrail(){
    searchValue = "highspeedrail"
    searchRailway.style.backgroundColor = "#fd9d9d"
    searchHighspeedrail.style.backgroundColor = "#ff4242"
    searchWeather.style.backgroundColor = "#fd9d9d"
    data = createData()
    getHighspeedrail(data)
}
function clickWeather(){
    searchValue = "weather"
    searchRailway.style.backgroundColor = "#fd9d9d"
    searchHighspeedrail.style.backgroundColor = "#fd9d9d"
    searchWeather.style.backgroundColor = "#ff4242"
    data = createData()
    getWeather(data)
}

function createData(){
    startStation.style.color = "black"
    terminalStation.style.color = "black"
    if (startStationValue == null || terminalStationValue == null){
        if (startStationValue == null){
            document.getElementById("startStation").textContent = "未選擇";
            startStation.style.color = "red"
        }
        if (terminalStationValue == null){
            document.getElementById("terminalStation").textContent = "未選擇";
            terminalStation.style.color = "red"
        }
        return data = {"error":true}
    }

    return data = {
        "start":startStationValue,
        "terminal":terminalStationValue,
        "search":searchValue
    }
}




