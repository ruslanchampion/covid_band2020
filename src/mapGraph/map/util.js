import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'

const casesTypeColors = {
  cases: {
    hex: "#170405",
    rgb: "rgb(23, 4, 5)",
    half_op: "rgba(23, 4, 5, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#1c3303",
    rgb: "rgb(21, 38, 2)",
    half_op: "rgba(21, 38, 2, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#210509",
    rgb: "rgb(41, 6, 6)",
    half_op: "rgba(41, 6, 6, 0.5)",
    multiplier: 2000,
  },
}

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format("0.0a")} per million` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        (Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier)/3
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));