let stationDiv = document.getElementById("station")
let start = document.getElementById("start")
let terminal = document.getElementById("terminal")
let searchRailway = document.getElementById("search_railway")
let searchHighspeedrail = document.getElementById("search_highspeedrail")
let searchWeather = document.getElementById("search_weather")
let railway = document.getElementById("railway")
let highspeedrail = document.getElementById("highspeedrail")
let weather = document.getElementById("weather")
let preload = document.getElementById("preload")
let alarm = document.getElementById("alarm")

// creat element Function
function createElement(appendBlock, elementStyle, addId = null, addClass = null, addText = null){
    element = document.createElement(elementStyle);
    if (addId != null){
        element.setAttribute("id",addId);
    }
    if (addClass != null){
        element.setAttribute("class",addClass);   
    }
    if (elementStyle == "img"){
        element.src = addText;
    }
    else{
        element.textContent = addText;
    }
    appendBlock.appendChild(element);
    globalThis.addId = document.getElementById(addId)
}
// Identify station
let station = {
    "0":"未選擇",
    "1":"南港站",
    "2":"台北站",
    "3":"板橋站",
    "4":"桃園站",
    "5":"新竹站",
    "6":"苗栗站",
    "7":"台中站",
    "8":"彰化站",
    "9":"雲林站",
    "10":"嘉義站",
    "11":"台南站",
    "12":"左營站",
}
// Init page
loadInPage()
createStation()

function loadInPage(){
    preload.style.display = "grid"
    railway.style.display = "none"
    highspeedrail.style.display = "none"
    weather.style.display = "none"
}
function createStation(){
    for (i=0;i<Object.keys(station).length;i++){
        createElement(start, "option", `stationStartName`, null, station[i])
        createElement(terminal, "option", `stationterminalName`, null, station[i])
    }
}
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=|Control button |=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
searchRailway.addEventListener("click",clickRailway)
searchHighspeedrail.addEventListener("click",clickHighspeedrail)
searchWeather.addEventListener("click",clickWeather)

// Button action
function clickRailway(){
    searchValue = "railway"
    data = createData()
    getRailway(data) 
    if (data.error == true || startStationValue == terminalStationValue){
        preload.style.display = "grid"
        railway.style.display = "none"
        highspeedrail.style.display = "none"
        weather.style.display = "none"
    }else{
        preload.style.display = "none"
        railway.style.display = "grid"
        highspeedrail.style.display = "none"
        weather.style.display = "none"
    }   
}
function clickHighspeedrail(){
    searchValue = "highspeedrail"
    data = createData()
    getHighspeedrail(data)
    if (data.error == true || startStationValue == terminalStationValue){
        preload.style.display = "grid"
        railway.style.display = "none"
        highspeedrail.style.display = "none"
        weather.style.display = "none"
    }else{
        preload.style.display = "none"
        railway.style.display = "none"
        highspeedrail.style.display = "grid"
        weather.style.display = "none"
    }
}
function clickWeather(){
    searchValue = "weather"
    data = createData()
    getWeather(data)
    if (data.error == true || startStationValue == terminalStationValue){
        preload.style.display = "grid"
        railway.style.display = "none"
        highspeedrail.style.display = "none"
        weather.style.display = "none"
    }else{
        preload.style.display = "none"
        railway.style.display = "none"
        highspeedrail.style.display = "none"
        weather.style.display = "grid"
    }
}

// Init the return data
let startStationValue = null
let terminalStationValue = null
let searchValue = null
let data = {
    "start":startStationValue,
    "terminal":terminalStationValue,
    "search":searchValue
}
// Create return data
function createData(){
    startStationValue = start.value;
    terminalStationValue = terminal.value;
    if (startStationValue == terminalStationValue){
        alarm.textContent = "起始站 及 終點站 重複了";
    }
    if (startStationValue == "未選擇" || terminalStationValue == "未選擇"){        
        if (startStationValue == "未選擇"){
            alarm.textContent = "請選擇 起始站";
        }
        if (terminalStationValue == "未選擇"){
            alarm.textContent = "請選擇 終點站";
        }
        if (startStationValue == "未選擇" && terminalStationValue == "未選擇"){
            alarm.textContent = "請選擇 起始站 及 終點站";
        }
        alarm.style.color = "red"
        return data = {"error":true}
    }
    return data = {
        "start":startStationValue,
        "terminal":terminalStationValue,
        "search":searchValue
    }
}