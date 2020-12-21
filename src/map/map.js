/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import infoBox from './infoBox'
import './map/App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldWide')

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
  }
  return (
    <div className="app">
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
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      </div>          
      

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

ReactDOM.render(<React.StrictMode>
  <App />
</React.StrictMode>,
document.getElementById('mapReact'));