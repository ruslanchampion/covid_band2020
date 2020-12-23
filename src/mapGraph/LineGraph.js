import _regeneratorRuntime from "babel-runtime/regenerator";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

var options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function label(tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      }
    }
  },
  scales: {
    xAxes: [{
      type: "time",
      time: {
        format: "MM/DD/YY",
        tooltipFormat: "ll"
      }
    }],
    yAxes: [{
      gridLines: {
        display: false
      },
      ticks: {
        callback: function callback(value, index, values) {
          return numeral(value).format("0a");
        }
      }
    }]
  }
};

var buildChartData = function buildChartData(data, casesType) {
  var MAXRANGE = 1000000;
  var chartData = [];
  var lastDataPoint = void 0;
  for (var date in data.cases) {
    if (lastDataPoint) {
      var newDataPoint = {
        x: date,
        y: Math.abs(data[casesType][date] - lastDataPoint) > MAXRANGE ? MAXRANGE : Math.abs(data[casesType][date] - lastDataPoint)
      };
      console.log(newDataPoint);
      chartData.push(newDataPoint);
      console.log(chartData);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph(_ref) {
  var _this = this;

  var casesType = _ref.casesType;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  useEffect(function () {
    var fetchData = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120").then(function (response) {
                  return response.json();
                }).then(function (data) {
                  var chartData = buildChartData(data, casesType);
                  setData(chartData);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function fetchData() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchData();
  }, [casesType]);
  return React.createElement(
    "div",
    null,
    data.length > 0 && React.createElement(Line, {
      data: {
        datasets: [{
          backgroundColor: "rgba(38, 32, 32, 0.5)",
          borderColor: "#171313",
          data: data
        }]
      },
      options: options
    })
  );
}
export default LineGraph;