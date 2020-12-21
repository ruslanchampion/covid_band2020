import React from 'react';

function baseMap() {
  return React.createElement(
    "div",
    { className: "map" },
    React.createElement(
      "h1",
      null,
      "I am Map!"
    )
  );
}

export default baseMap;