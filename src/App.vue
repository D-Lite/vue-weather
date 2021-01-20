<template>
<div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : 'cold'">
  <main>
    <div class="search-box">
      <input 
        type="text" 
        class="search-bar"
        placeholder="Search....."
        v-model="query"
        @keypress="fetchWeather"
        />
        
    </div>

    <div class="weather-wrap" v-if="typeof weather.main != 'undefined' ">
      <div class="location-box">
        <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
        <div class="date"> {{ dateBuilder() }} </div>
      </div>

      <div class="weather-box">
        <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
        <div class="weather"> {{ weather.weather[0].main }} </div>  
      </div>
    </div>

    <div class="guideline">
      <div class="guidehead">
        <h3>Directives </h3>
      </div>
      <div class="guidebody">
        <ol>
          <li><h4>Welcome here, </h4></li>
          <li><h4> Enter a location in the search box above</h4></li>
          <li><h4> Press the enter key </h4></li>
          <li><h4> Wait for response from the site </h4></li>
        </ol>
      </div>
    </div>

    <div class="appreciate">
      <div class="footapp">
        <h4>With <i style="color: red; font-size: 20px"> ♥️ </i> from Daniel....</h4>
      </div>
    </div>
  </main>
</div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
    api_key: '102b016109004dfb949ae5c1e79d5856',
    url_base: 'https://api.openweathermap.org/data/2.5/',
    query: '',
    weather: {}
    }
  },

  methods: {
    fetchWeather (e) {
      if(e.key == "Enter"){
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);
      }
    },
    setResults(results){
      this.weather = results;
    },
    dateBuilder(){
      let d = new Date();
      let months = ["January", "February", "March", "April",
       "May", "June","July","August","September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
    
      return `${day} ${date} ${month} ${year}`;
    }   
  }

}
</script>

<style>
*{
  margin: 0;
  padding: 0%;
  box-sizing: border-box;
}
body{
  font-family: 'montserrat', sans-serif;
}
#app{
  background-image: url("./assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

main{
  min-height: 100vh;
  padding: 35px;
  /* background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75)) ; */
}

.search-box{
  width: 100%;
  margin-bottom: 20px;
  margin-left: 2%;
  margin-right: 5%;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 2%;
  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  background: none;

  background-color: rgba(255, 255, 255, 0.5);

  box-shadow: 0px 0px  16px rgba(255,255,255, 0.75);
  border-radius: 0px 10px;
  outline: none;
  transition: 0.4s;

}

.search-box .search-bar:focus{
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px;
}

.location-box .location{
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25);
}

#app.warm{
  background-image: url('./assets/warm-bg.jpg');
}

#app.cold{
  background-image: url('./assets/cold-bg.jpg');
}

.location-box .date{
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box{
  text-align: center;
}

.weather-box .temp{
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255,255,255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 3px 6px rgba(255, 255, 255, 0.25);
}

.weather-box .weather{
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

}

.guideline  {
  box-shadow: 0px 0px rgba(255, 255, 255, 0.25);

  /* text-shadow: 3px 6px rgba(0, 0, 0, 0.25); */
  background-color: #c4c4c4;
  border-radius: 5px;
  margin: 0px 0px;
  min-height: fit-content;
  padding: 10px;
  min-width: fit-content;
}
.guidehead  {
  text-align: left;
  font-size: 20px;
  color: #000;
  text-decoration: underline rgba(0,0,0);
  /* text-shadow: 3px 4px rgba(0, 0, 0, 0.3); */
}

.guidebody {
  text-align: left;
  font-size: 15px;
  font-weight: 300;
  /* margin-left: 5%; */
  width: 100%;
}
.guidebody li{
  text-align: left;
  margin: 10px;
}

.appreciate {
  width: 100%;
  background-color: blue;

}

.footapp {
  position: fixed;
  bottom: 0%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
