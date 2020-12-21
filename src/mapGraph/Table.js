import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table(_ref) {
  var countries = _ref.countries;

  return React.createElement(
    "div",
    { className: "table" },
    countries.map(function (country) {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          country.country
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "strong",
            null,
            numeral(country.cases).format("0,0")
          )
        )
      );
    })
  );
}

export default Table;