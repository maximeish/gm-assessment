import React from "react";
import WrappedMap from "./gMap/Map";
import config from "./gMap/config";
import Header from "./Header/Header";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import paths from "../mocks/paths.json";
import stops from "../mocks/stops";

function Map() {
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.mapsKey}`;

  return (
    <div className="w-full sm:w-[25vw]">
      <Header />

      {paths && stops ? (
        <WrappedMap
          paths={paths}
          stops={stops}
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="mapContainer" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "4em auto",
          }}
        >
          <span className="loading loading-infinity loading-lg bg-[#C0C781]"></span>
        </Box>
      )}
    </div>
  );
}

export default Map;
