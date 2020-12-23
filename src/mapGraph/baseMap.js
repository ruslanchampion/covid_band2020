import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";
import LineGraph from "./LineGraph";

function Map(_ref) {
  var countries = _ref.countries,
      casesType = _ref.casesType,
      center = _ref.center,
      zoom = _ref.zoom;

  return React.createElement(
    "div",
    { className: "map" },
    React.createElement(
      LeafletMap,
      { center: center, zoom: zoom, color: "#1d2633", fillColor: "#1d2633" },
      React.createElement(TileLayer, {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "\xA9 <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
      }),
      showDataOnMap(countries, casesType)
    )
  );
}

export default Map;