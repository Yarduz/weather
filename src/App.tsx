import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SelectedCity from './components/SelectedCity';
import SavedCities from './components/SavedCities';
import BG from './components/BG';

const API_KEY: string = "G1DVa3VZCUwrI1dQDjqrog4SgmlqmJC9"
const EILAT_GEO_LOC: string = "1-215615_1_AL"
const REQ_LOC = "eilat"

const FORCAST_REQ: string = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${EILAT_GEO_LOC}?apikey=${API_KEY}HTTP/1.1`
const LOC_REQ: string = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${REQ_LOC}HTTP/1.1`

const darkmode = { addClass: 'dark', icon: "dark_mode" }
const brightmode = { addClass: '', icon: "light_mode" }

function App() {
  const [favCities, setFavCities] = useState([])
  const [err, setErr] = useState(false)
  const [mode, setMode] = useState(darkmode)
  const [cityName, setCityName] = useState("")

  function setTheMode() {
    if (mode.addClass === "dark") {
      setMode(brightmode)
    }
    else {
      setMode(brightmode)
    }
  }

  async function searchHandler(value: string) {
    let newFav: any = {}
    newFav.name = value
    console.log(newFav.name)
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${value}HTTP/1.1`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(restData => {
        if (restData.status !== 200) {
          return Promise.reject("city not found")
        }
        else {
          return restData.json()
        }
      })
      .then(data => newFav.geoLoc = data)
      .catch(err => {
        console.log(err)
        setErr(true)
      })
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${newFav.geoLoc}?apikey=${API_KEY}HTTP/1.1`)
      .then(restData => {
        if (restData.status !== 200) {
          return Promise.reject("weather not found")
        }
        else {
          return (restData.json)
        }
      })
      .then(data => newFav.weather = data)
    favCities.push(newFav);
    console.log(favCities)
  }


  return (
    <>
      <BG mode={mode.addClass} />
      <div className="App">
        <div>
          <h1 className='title'>this is Yarduz's Weather App</h1>
          <span onClick={setTheMode}>
            night_light
          </span>
        </div>
        <SearchBar searchHandler={searchHandler} />
        <SelectedCity />
        <SavedCities />
      </div>
    </>
  );
}

export default App;
