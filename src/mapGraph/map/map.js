/* eslint-disable */
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import infoBox from './infoBox'
import baseMap from "./baseMap"
import './map/App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
function App() {
  const [country, setInputCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])
  const [mapCountries, setMapCountries] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {
        const countries = data.map((country)=> (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }))

        setCountries(countries)
      })
    }
    getCountriesData()
  }, [] )

  const onCountyChange = async (event) => {
    const countyCode = event.target.value
    setCountry(countyCode)

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  }
  return (
    <div className="app">
     <div className="app__left"> 
      <div className="app__header">
        <h1>COVID19</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined" onChange={onCountyChange}
            value={country}
          >
              <MenuItem value="worldWide">worldWide</ MenuItem>  
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</ MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <infoBox title="Coronavirus cases" total={2000}/>
        <infoBox title="Recoverd" total={3000}/>
        <infoBox title="Deathes" total={4000}/>
      </div>          
      
      <baseMap />
     </div> 
     <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country!</h3>
          <h3>Worldwide new cases!</h3>
        </CardContent>
     </Card>
    </div>
  );
}

ReactDOM.render(<React.StrictMode>
  <App />
</React.StrictMode>,
document.getElementById('mapReact'));