import _regeneratorRuntime from 'babel-runtime/regenerator';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import infoBox from './infoBox';
import baseMap from "./baseMap";
import './map/App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
function App() {
  var _this = this;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      countries = _useState2[0],
      setCountries = _useState2[1];

  var _useState3 = useState('worldWide'),
      _useState4 = _slicedToArray(_useState3, 2),
      country = _useState4[0],
      setCountry = _useState4[1];

  useEffect(function () {
    var getCountriesData = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("https://disease.sh/v3/covid-19/countries").then(function (response) {
                  return response.json();
                }).then(function (data) {
                  var countries = data.map(function (country) {
                    return {
                      name: country.country,
                      value: country.countryInfo.iso2
                    };
                  });

                  setCountries(countries);
                });

              case 2:
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

  var onCountyChange = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(event) {
      var countyCode;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              countyCode = event.target.value;

              setCountry(countyCode);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function onCountyChange(_x) {
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
          'COVID19'
        ),
        React.createElement(
          FormControl,
          { className: 'app__dropdown' },
          React.createElement(
            Select,
            {
              variant: 'outlined', onChange: onCountyChange,
              value: country
            },
            React.createElement(
              MenuItem,
              { value: 'worldWide' },
              'worldWide'
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
        React.createElement('infoBox', { title: 'Coronavirus cases', total: 2000 }),
        React.createElement('infoBox', { title: 'Recoverd', total: 3000 }),
        React.createElement('infoBox', { title: 'Deathes', total: 4000 })
      ),
      React.createElement('baseMap', null)
    ),
    React.createElement(
      Card,
      { className: 'app__right' },
      React.createElement(
        CardContent,
        null,
        React.createElement(
          'h3',
          null,
          'Live Cases by Country!'
        ),
        React.createElement(
          'h3',
          null,
          'Worldwide new cases!'
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