function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

var casesTypeColors = {
  cases: {
    hex: "#170405",
    rgb: "rgb(23, 4, 5)",
    half_op: "rgba(23, 4, 5, 0.5)",
    multiplier: 800
  },
  recovered: {
    hex: "#1c3303",
    rgb: "rgb(21, 38, 2)",
    half_op: "rgba(21, 38, 2, 0.5)",
    multiplier: 1200
  },
  deaths: {
    hex: "#210509",
    rgb: "rgb(41, 6, 6)",
    half_op: "rgba(41, 6, 6, 0.5)",
    multiplier: 2000
  }
};

export var sortData = function sortData(data) {
  var sortedData = [].concat(_toConsumableArray(data));
  sortedData.sort(function (a, b) {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export var prettyPrintStat = function prettyPrintStat(stat) {
  return stat ? numeral(stat).format("0.0a") + ' per million' : "+0";
};

export var showDataOnMap = function showDataOnMap(data) {
  var casesType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "cases";
  return data.map(function (country) {
    return React.createElement(
      Circle,
      {
        center: [country.countryInfo.lat, country.countryInfo.long],
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
        fillOpacity: 0.4,
        radius: Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier / 3
      },
      React.createElement(
        Popup,
        null,
        React.createElement(
          'div',
          { className: 'info-container' },
          React.createElement('div', {
            className: 'info-flag',
            style: { backgroundImage: 'url(' + country.countryInfo.flag + ')' }
          }),
          React.createElement(
            'div',
            { className: 'info-name' },
            country.country
          ),
          React.createElement(
            'div',
            { className: 'info-confirmed' },
            'Cases: ',
            numeral(country.cases).format("0,0")
          ),
          React.createElement(
            'div',
            { className: 'info-recovered' },
            'Recovered: ',
            numeral(country.recovered).format("0,0")
          ),
          React.createElement(
            'div',
            { className: 'info-deaths' },
            'Deaths: ',
            numeral(country.deaths).format("0,0")
          )
        )
      )
    );
  });
};