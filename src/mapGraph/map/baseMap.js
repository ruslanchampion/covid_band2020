import React from "react"
import { Map as LeafletMap, TileLayer } from "react-leaflet"
import "./map/Map.css"
import { showDataOnMap } from "./util"
import LineGraph from "./LineGraph"

 function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} color={"#1d2633"} fillColor={"#1d2633"}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map
