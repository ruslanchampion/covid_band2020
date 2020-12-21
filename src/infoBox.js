import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
function infoBox(_ref) {
  var title = _ref.title,
      cases = _ref.cases,
      total = _ref.total;

  return React.createElement(
    Card,
    { className: "infoBox" },
    React.createElement(
      CardContent,
      null,
      React.createElement(
        Typography,
        { className: "infoBox__title", color: "textSeconadry" },
        title
      ),
      React.createElement(
        "h2",
        { className: "infoBox__cases" },
        cases
      ),
      React.createElement(
        Typography,
        { className: "infoBox__total", color: "textSeconadry" },
        total,
        " Total"
      )
    )
  );
}

export default infoBox;