import React, { useState } from "react";
import WrappedMap from "./gMap/Map";
import MapUsingLoc from "./gMap/MapUsingLoc";
import config from "./gMap/config";
import Header from "./Header/Header";
import Box from "@mui/material/Box";
import paths from "../mocks/paths.json";
import stops from "../mocks/stops";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Map() {
  const [mapType, setMapType] = useState("notUsingLoc");
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.mapsKey}`;

  const [checked, setChecked] = useState(true);

  const onChange = () => {
    setChecked(!checked);
    if (mapType === "notUsingLoc") setMapType("usingLoc");
    else setMapType("notUsingLoc");
  };

  const [l, setL] = useState(true);
  setTimeout(() => {
    setL(false);
  }, 3000);

  return (
    <div className="w-full lg:w-[25vw]">
      <Header
        Switch={() => (
          <FormControlLabel
            style={{ color: "white" }}
            control={
              <Switch size="small" checked={checked} onChange={onChange} />
            }
            label="Simulated"
          />
        )}
      />

      {!l && paths && stops && mapType === "usingLoc" ? (
        <MapUsingLoc
          paths={paths}
          stops={stops}
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="mapContainer" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      ) : !l && paths && stops && mapType === "notUsingLoc" ? (
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
