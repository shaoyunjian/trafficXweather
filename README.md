# 題目：trafficXweather
## 專案發想及主要功能：
#### 查詢交通所花費時間及金額(依照高鐵站為主)，以及目的地站的一週天氣。
## 實測網址：
[實測網址](https://chiayingc.github.io/trafficXweather/).
## Figma草圖：
[Figma draft](https://www.figma.com/file/oFWSqY2UkKcVMAnh1rT4bY/week7%E5%8D%94%E4%BD%9C?node-id=9%3A3&t=nFZK1eTYF5qPHjfh-0).

![This is figma draft.](./image/figma.png "figma draft.")


## 專案發想及合作
### 發想過程：
* 初始概念：一開始為了達到設計目的及分工方便將網站分割成四個頁面 
* 使用問題：查詢資料過程需要一直跳轉頁面，簡單的功能，變得複雜化
* 設計變更：將內容濃縮成一頁，改使用js渲染的方式將畫面呈現，使用者可以直接在同一個頁面上進行所有操作

### 合作過程：
* 一般討論：Discord群組溝通、Google meet進行會議 
* 版面討論：Figma 進行版面設計討論
* 版本控制：由專案主負責人開啟GitHub專案，有main及develop分支，成員Fork專案，在不動到其他人文件的前提下個別 push檔案至GitHub並發起Pull Requests，由專案負責人拉進主專案(develop分支)中。


## 分工：

| 項目  | 負責人員 |
| ------------- |:-------------:|
| 版面設計、Github | 陳佳瑩    |
| 首頁串接、簡報      | 蕭士晟    |
| 高鐵資訊      | 周品甄    |
| 台鐵資訊      | 陳冠守    |
| 天氣資訊      | 簡劭芸    |

## 檔案：
**HTML** 

1. index.html	  	 ___*陳佳瑩*

**JS** 

1. option.js	  	 ___*蕭士晟*
1. railway.js	  	 ___*陳冠守*
1. highspeedrail.js	  	 ___*周品甄*
1. weather.js	  	 ___*簡劭芸*

**CSS** 

1. index.css	  	 ___*陳佳瑩*
1. weather.css	  	 ___*簡劭芸*

## 專案使用技術
### 使用API來源：
* [氣象局API](https://opendata.cwb.gov.tw/dist/opendata-swagger.html#/ ). 
* [交通部API](https://tdx.transportdata.tw/api-service/swagger ). 

### 使用技術：
* Git/GitHub：協作及版本控制
* CDN：api及套件 檔案串連
* fetch() ：訪問api獲取資料