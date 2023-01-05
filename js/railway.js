async function getRailway(data) {
  // data = { start: "台北站", terminal: "雲林站", search: "railway" };
  if(data["start"]){
  const stations = {
    南港站: "0980",
    台北站: "1000",
    板橋站: "1020",
    桃園站: "1080",
    新竹站: "1210",
    苗栗站: "3160",
    台中站: "3300",
    彰化站: "3360",
    雲林站: "3470",
    嘉義站: "4080",
    台南站: "4220",
    左營站: "4340",
  };
  const start = stations[data["start"]];
  const terminal = stations[data["terminal"]];
  const dateobj = new Date();
  const todayString = dateobj.toISOString().split("T")[0];
  const priceUrl = `https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/ODFare/${start}/to/${terminal}?%24top=30&%24format=JSON`;
  const distanceUrl=`https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/DailyTrainTimetable/OD/${start}/to/${terminal}/2023-01-04?%24top=100&%24format=JSON`
  let direction = 0;
  if (terminal - start > 0) {
    direction = 1;
  }
  let price = await getPriceApiResponse(priceUrl, direction);
  let time = await getTimeApiResponse(distanceUrl, direction,todayString);

  const railway =document.querySelectorAll("#railway")[0]
  const highspeedrail =document.querySelectorAll("#highspeedrail")[0]
  const weather =document.querySelectorAll("#weather")[0]
  
  highspeedrail.style.display="none"
  weather.style.display="none"
  railway.style.display="grid"

  const railway_short_drive_time = document.querySelectorAll("#railway_short_drive_time")[0]
  const railway_long_drive_time = document.querySelectorAll("#railway_long_drive_time")[0]
  const railway_short_drive_price =document.querySelectorAll("#railway_short_drive_price")[0]
  const railway_long_drive_price = document.querySelectorAll("#railway_long_drive_price")[0]

  railway_short_drive_time.textContent=time["lowerest_time"]
  railway_long_drive_time.textContent=time["highest_time"]
  railway_short_drive_price.textContent=price["highest_price"]
  railway_long_drive_price.textContent=price["lowerest_price"]
}
else{}
}

async function getAcessToken() {
  const auth_url =
    "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

  const myHeaders = new Headers();
  myHeaders.append("content-type", "application/x-www-form-urlencoded");

  const details = {
    grant_type: "client_credentials",
    client_id: "dirk122119-86f14fd9-5e95-4956",
    client_secret: "a0d81246-b81d-4863-8bc6-11fc6dd2ea45",
  };
  let formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formBody,
  };

  return await fetch(auth_url, requestOptions).then((response) => {
    return response.json();
  });
}

async function getPriceApiResponse(priceUrl, direction) {
  const accesstoken = await getAcessToken();
  //   console.log(accesstoken["access_token"])
  const myHeaders = new Headers();
  myHeaders.append(
    "authorization-type",
    `Bearer ${accesstoken["access_token"]}`
  );
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  const res = await fetch(priceUrl, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let lowerest_price = 10000;
      let highest_price = 0;
      response["ODFares"].forEach((element) => {
        // console.log(element)
        if (element.TrainType === 10 && element.Direction === direction) {
          if (lowerest_price > element["Fares"][0]["Price"]) {
            lowerest_price = element["Fares"][0]["Price"];
          }
        }
        if (element.TrainType === 3 && element.Direction === direction) {
          if (highest_price < element["Fares"][0]["Price"]) {
            highest_price = element["Fares"][0]["Price"];
          }
        }
      });
      const price = {
        lowerest_price: `${lowerest_price}元`,
        highest_price: `${highest_price}元`,
      };
      return price;
    });
    return res
}


async function getTimeApiResponse(priceUrl, direction,todayString) {
    const accesstoken = await getAcessToken();
    //   console.log(accesstoken["access_token"])
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization-type",
      `Bearer ${accesstoken["access_token"]}`
    );
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const res = await fetch(priceUrl, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let lowerest_time = 1000000;
        let highest_time = 0;
        const [year, month, day] = todayString.split('-');
        const seconds="00"
        response["TrainTimetables"].forEach((element) => {
           let departureTime = element["StopTimes"][0]["DepartureTime"]
           let arrivalTime = element["StopTimes"][1]["ArrivalTime"]
           let [departureTimeHours, departureTimeMinutes] = departureTime.split(':');
           let [arrivalTimeHours, arrivalTimeMinutes] = arrivalTime.split(':');

           let departureDateTime = new Date(+year, month - 1, +day, +departureTimeHours, +departureTimeMinutes, +seconds);
           let arrivalDateTime = new Date(+year, month - 1, +day, +arrivalTimeHours, +arrivalTimeMinutes, +seconds);

           let departureTimestamp = departureDateTime.getTime()
           let arrivalTimestamp = arrivalDateTime.getTime()
           let periodTime = (arrivalTimestamp-departureTimestamp)/1000
           if (periodTime<lowerest_time) {
            lowerest_time=periodTime
          }
          if (periodTime>highest_time) {
            highest_time=periodTime
          }
        })
        
        let lowerest_hr = Math.floor(lowerest_time/3600)
        let lowerest_minute = Math.ceil(((lowerest_time/3600)-lowerest_hr)*60)
        let highest_hr = Math.floor(highest_time/3600)
        let highest_minute = Math.ceil(((highest_time/3600)-highest_hr)*60)
        if(lowerest_hr<0){
          lowerest_hr=lowerest_hr+24
        }
        return {"lowerest_time":`${lowerest_hr}小時${lowerest_minute}分`,"highest_time":`${highest_hr}小時${highest_minute}分`}

       
      });
      return res
  }
//getRailway({ start: "台北站", terminal: "雲林站", search: "railway" });
