function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(_ref) {
  var title = _ref.title,
      cases = _ref.cases,
      total = _ref.total,
      active = _ref.active,
      isRed = _ref.isRed,
      props = _objectWithoutProperties(_ref, ["title", "cases", "total", "active", "isRed"]);

  return React.createElement(
    Card,
    {
      onClick: props.onClick,
      className: "infoBox " + (active && "infoBox--selected") + " " + (isRed && "infoBox--red")
    },
    React.createElement(
      CardContent,
      null,
      React.createElement(
        Typography,
        { color: "textSecondary", gutterBottom: true },
        title
      ),
      React.createElement(
        "h2",
        { className: "infoBox__cases " + (!isRed && "infoBox__cases--green") },
        cases
      ),
      React.createElement(
        Typography,
        { className: "infoBox__total", color: "textSecondary" },
        total,
        " Total"
      )
    )
  );
}

export default InfoBox;