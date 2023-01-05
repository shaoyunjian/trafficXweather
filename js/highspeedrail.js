function getHighspeedrail(station_data) {
  weather.style.display = "none";
  railway.style.display = "none";

  if (station_data.error == true) {
    // alert("請點選您的起始站與終點站");
  } else {
    // result field
    const HIGHSPEEDRAIL_LONG_DRIVE_TIME = document.querySelector(
      "#highspeedrail_long_drive_time"
    );
    const HIGHSPEEDRAIL_SHORT_DRIVE_TIME = document.querySelector(
      "#highspeedrail_short_drive_time"
    );
    const HIGHSPEEDRAIL_LONG_DRIVE_PRICE = document.querySelector(
      "#highspeedrail_long_drive_price"
    );
    const HIGHSPEEDRAIL_SHORT_DRIVE_PRICE = document.querySelector(
      "#highspeedrail_short_drive_price"
    );

    let allStation = {};
    // allStation = {
    //   南港站: "0990",
    //   台中站: "1040",
    //   台北站: "1000",
    //   台南站: "1060",
    //   嘉義站: "1050",
    //   左營站: "1070",
    //   彰化站: "1043",
    //   新竹站: "1030",
    //   板橋站: "1010",
    //   桃園站: "1020",
    //   苗栗站: "1035",
    //   雲林站: "1047"}
    let ticketFare;

    // get today date
    let TrainDate = new Date();
    let year = TrainDate.getFullYear();
    let month;
    if (TrainDate.getMonth() + 1 < 10) {
      month = "0" + (TrainDate.getMonth() + 1);
    } else {
      month = TrainDate.getMonth() + 1;
    }
    let day;
    if (TrainDate.getDate() < 10) {
      day = "0" + TrainDate.getDate();
    } else {
      day = TrainDate.getDate();
    }
    let today = year + "-" + month + "-" + day;
    //console.log("today: ", today);

    // get departure & destination
    let departureStation = station_data.start;
    let destinationStation = station_data.terminal;
    console.log(departureStation, destinationStation);

    //  call api to show datas

    getTHSRStationInfo();

    // ========== functions ==========
    // v2/Rail/THSR/Station 取得車站基本資料
    function getTHSRStationInfo() {
      fetch(
        "https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/Station?%24top=100&health=false&%24format=JSON"
      )
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          for (let i = 0; i < data.length; i++) {
            // get all station name and its ID
            let StationName = data[i]["StationName"]["Zh_tw"];
            let StationID = data[i]["StationID"];
            allStation[StationName + "站"] = StationID;
          }
          //console.log("allStation:", allStation);
          getTHSRStationFare();
          getTHSRStationTime();
        });
    }

    // v2/Rail/THSR/ODFare/{OriginStationID}/to/{DestinationStationID} 取得起訖站間之票價
    function getTHSRStationFare() {
      let ticket_api_url =
        "https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/ODFare/" +
        allStation[departureStation] +
        "/to/" +
        allStation[destinationStation] +
        "?%24top=1000&%24format=JSON";
      fetch(ticket_api_url)
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          //console.log(data);
          for (let i = 0; i < data[0]["Fares"].length; i++) {
            TicketType = data[0]["Fares"][i]["TicketType"];
            FareClass = data[0]["Fares"][i]["FareClass"];
            CabinClass = data[0]["Fares"][i]["CabinClass"];
            if (TicketType == 1 && FareClass == 1 && CabinClass == 1) {
              ticketFare = data[0]["Fares"][i]["Price"];
            } else {
            }
          }
          //TicketType：1:'一般票(單程票)',2:'來回票',3:'電子票証(悠遊卡/一卡通)',4:'回數票',5:'定期票(30天期)',6:'定期票(60天期)',7:'早鳥票',8:'團體票'
          //FareClass：1:'成人',2:'學生',3:'孩童',4:'敬老',5:'愛心',6:'愛心孩童',7:'愛心優待/愛心陪伴',8:'軍警',9:'法優'
          //CabinClass：1:'標準座車廂',2:'商務座車廂',3:'自由座車廂'
          HIGHSPEEDRAIL_LONG_DRIVE_PRICE.innerHTML = ticketFare;
          HIGHSPEEDRAIL_SHORT_DRIVE_PRICE.innerHTML = ticketFare;
        });
    }

    // v2/Rail/THSR/DailyTimetable/OD/{OriginStationID}/to/{DestinationStationID}/{TrainDate} 取得指定日期、起迄站間之時刻表資料
    function getTHSRStationTime() {
      console.log(allStation[departureStation], allStation[destinationStation]);
      time_api_url =
        "https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/DailyTimetable/OD/" +
        allStation[departureStation] +
        "/to/" +
        allStation[destinationStation] +
        "/" +
        today +
        "?%24top=1000&%24format=JSON";
      fetch(time_api_url)
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          let maxDiff = 0;
          let minDiff = 100000000000000000;
          for (let i = 0; i < data.length; i++) {
            let startTime =
              data[i]["OriginStopTime"]["DepartureTime"].split(":");
            let endTime =
              data[i]["DestinationStopTime"]["ArrivalTime"].split(":");
            let startDate = new Date(0, 0, 0, startTime[0], startTime[1], 0);
            let endDate = new Date(0, 0, 0, endTime[0], endTime[1], 0);
            let diff = endDate.getTime() - startDate.getTime();
            if (diff > maxDiff) {
              maxDiff = diff;
            } else {
            }
            if (diff < minDiff) {
              minDiff = diff;
            } else {
            }
            //   let hours = Math.floor(diff / 1000 / 60 / 60);
            //   diff -= hours * 1000 * 60 * 60;
            //   let minutes = Math.floor(diff / 1000 / 60);

            let max_hours = Math.floor(maxDiff / 1000 / 60 / 60);
            let maxDiff_diff = maxDiff - max_hours * 1000 * 60 * 60;
            let max_minutes = Math.floor(maxDiff_diff / 1000 / 60);

            let min_hours = Math.floor(minDiff / 1000 / 60 / 60);
            let minDiff_diff = minDiff - min_hours * 1000 * 60 * 60;
            let min_minutes = Math.floor(minDiff_diff / 1000 / 60);

            HIGHSPEEDRAIL_LONG_DRIVE_TIME.innerHTML =
              max_hours + " 時 " + max_minutes + " 分";
            HIGHSPEEDRAIL_SHORT_DRIVE_TIME.innerHTML =
              min_hours + " 時 " + min_minutes + " 分";
          }
        });
    }
  }
}
