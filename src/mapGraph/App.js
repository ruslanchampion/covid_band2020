import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import baseMap from "./baseMap";
import Table from './Table';
import LineGraph from './LineGraph';
import './map/App.css';
import numeral from 'numeral';
import { sortData, prettyPrintStat } from './util';
import InfoBox from './InfoBox';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
function App() {
  var _this = this;

  var _useState = useState("worldwide"),
      _useState2 = _slicedToArray(_useState, 2),
      country = _useState2[0],
      setInputCountry = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      countryInfo = _useState4[0],
      setCountryInfo = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      countries = _useState6[0],
      setCountries = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      mapCountries = _useState8[0],
      setMapCountries = _useState8[1];

  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      tableData = _useState10[0],
      setTableData = _useState10[1];

  var _useState11 = useState("cases"),
      _useState12 = _slicedToArray(_useState11, 2),
      casesType = _useState12[0],
      setCasesType = _useState12[1];

  useEffect(function () {
    fetch("https://disease.sh/v3/covid-19/all").then(function (response) {
      return response.json();
    }).then(function (data) {
      setCountryInfo(data);
    });
  }, []);

  useEffect(function () {
    var getCountriesData = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetch("https://disease.sh/v3/covid-19/countries").then(function (response) {
                  return response.json();
                }).then(function (data) {
                  var countries = data.map(function (country) {
                    return {
                      name: country.country,
                      value: country.countryInfo.iso2
                    };
                  });
                  var sortedData = sortData(data);
                  setCountries(countries);
                  setMapCountries(data);
                  setTableData(sortedData);
                });

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function getCountriesData() {
        return _ref.apply(this, arguments);
      };
    }();

    getCountriesData();
  }, []);

  var onCountryChange = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(event) {
      var countryCode, url;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              countryCode = event.target.value;

              setCountry(countryCode);

              url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : 'https://disease.sh/v3/covid-19/countries/' + countryCode;
              _context2.next = 5;
              return fetch(url).then(function (response) {
                return response.json();
              }).then(function (data) {
                setInputCountry(countryCode);
                setCountryInfo(data);
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function onCountryChange(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement(
      'div',
      { className: 'app__left' },
      React.createElement(
        'div',
        { className: 'app__header' },
        React.createElement(
          'h1',
          null,
          'COVID-19 Tracker'
        ),
        React.createElement(
          FormControl,
          { className: 'app__dropdown' },
          React.createElement(
            Select,
            {
              variant: 'outlined',
              value: country,
              onChange: onCountryChange
            },
            React.createElement(
              MenuItem,
              { value: 'worldwide' },
              'Worldwide'
            ),
            countries.map(function (country) {
              return React.createElement(
                MenuItem,
                { value: country.value },
                country.name
              );
            })
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'app__stats' },
        React.createElement(InfoBox, {
          onClick: function onClick(e) {
            return setCasesType("cases");
          },
          title: 'Coronavirus Cases',
          isRed: true,
          active: casesType === "cases",
          cases: prettyPrintStat(countryInfo.todayCases),
          total: numeral(countryInfo.cases).format("0.0a")
        }),
        React.createElement(InfoBox, {
          onClick: function onClick(e) {
            return setCasesType("recovered");
          },
          title: 'Recovered',
          active: casesType === "recovered",
          cases: prettyPrintStat(countryInfo.todayRecovered),
          total: numeral(countryInfo.recovered).format("0.0a")
        }),
        React.createElement(InfoBox, {
          onClick: function onClick(e) {
            return setCasesType("deaths");
          },
          title: 'Deaths',
          isRed: true,
          active: casesType === "deaths",
          cases: prettyPrintStat(countryInfo.todayDeaths),
          total: numeral(countryInfo.deaths).format("0.0a")
        })
      )
    ),
    React.createElement(
      Card,
      { className: 'app__right' },
      React.createElement(
        CardContent,
        null,
        React.createElement(
          'div',
          { className: 'app__information' },
          React.createElement(
            'h3',
            null,
            'Live Cases by Country'
          ),
          React.createElement(Table, { countries: tableData }),
          React.createElement(
            'h3',
            null,
            'Worldwide new ',
            casesType
          ),
          React.createElement(LineGraph, { casesType: casesType })
        )
      )
    )
  );
}
ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById('mapReact'));