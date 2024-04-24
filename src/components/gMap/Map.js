import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import Card from "@mui/material/Card";
import "../../index.css";
import { toast } from "react-toastify";

const Map = ({ paths, stops }) => {
  const [progress, setProgress] = useState(null);
  const [tripStart, setTripStart] = useState(false);
  const [dist, setDist] = useState(0);
  const [time, setTime] = useState(0);
  const [nextStop, setNextStop] = useState("Bus Stop 1");

  const velocity = 100; // 360 km per hr (fast to speed up simulation)
  let initialDate;
  let interval = null;

  const icon1 = {
    url: "https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/FAB005/external-bus-transportation-icongeek26-glyph-icongeek26-1.png",
    scaledSize: new window.google.maps.Size(40, 40),
    anchor: new window.google.maps.Point(20, 20),
    scale: 0.2,
  };

  const center = parseInt(paths.length / 2);
  const centerPathLat = paths[center].lat;
  const centerpathLng = paths[center].lng;

  const getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - initialDate) / 1000; // pass to seconds
    return differentInTime * velocity;
  };

  useEffect(() => {
    calculatePath();

    return () => interval && window.clearInterval(interval);
  }, [paths]);

  useEffect(() => {
    setDist(
      window.google.maps.geometry.spherical.computeDistanceBetween(
        stops.data[0],
        stops.data[1]
      )
    );

    setTime(
      window.google.maps.geometry.spherical.computeDistanceBetween(
        stops.data[0],
        stops.data[1]
      ) / velocity
    );
  }, []);

  const moveObject = () => {
    const distance = getDistance();
    if (!distance) return;

    let progress = paths.filter(
      (coordinates) => coordinates.distance < distance
    );

    const nextLine = paths.find(
      (coordinates) => coordinates.distance > distance
    );

    if (!nextLine) {
      setProgress(progress);
      window.clearInterval(interval);
      toast.success("🚌 Trip complete", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: "bounce",
      });
      setTripStart(false);
      setNextStop("");
      setDist(0);
      setTime(0);
      return;
    }
    const lastLine = progress[progress.length - 1];

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    );

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    );

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );

    setDist(totalDistance);

    setNextStop(
      paths.filter((p) => p.lat === nextLine.lat && p.lng === nextLine.lng)[0]
        .name
    );

    setTime(totalDistance / velocity);

    mapUpdate();

    setProgress(progress.concat(position));
  };

  const calculatePath = () => {
    paths = paths.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 }; // it begins here
      }
      const { lat: lat1, lng: lng1 } = coordinates;
      const latLong1 = new window.google.maps.LatLng(lat1, lng1);

      const { lat: lat2, lng: lng2 } = array[0];
      const latLong2 = new window.google.maps.LatLng(lat2, lng2);

      // in meters:
      const distance =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          latLong1,
          latLong2
        );

      return { ...coordinates, distance };
    });
  };

  const startSimulation = useCallback(() => {
    if (interval) {
      window.clearInterval(interval);
    }
    setProgress(null);
    setTripStart(true);
    initialDate = new Date();
    interval = window.setInterval(moveObject, 1000);
  }, [interval, initialDate]);

  const mapUpdate = () => {
    const distance = getDistance();
    if (!distance) {
      return;
    }

    let progress = paths.filter(
      (coordinates) => coordinates.distance < distance
    );

    const nextLine = paths.find(
      (coordinates) => coordinates.distance > distance
    );

    let pt1, pt2;

    if (nextLine) {
      pt1 = progress[progress.length - 1];
      pt2 = nextLine;
    } else {
      // it's the end, so use the latest 2
      pt1 = progress[progress.length - 2];
      pt2 = progress[progress.length - 1];
    }

    const pt1LatLng = new window.google.maps.LatLng(pt1.lat, pt1.lng);
    const pt2LatLng = new window.google.maps.LatLng(pt2.lat, pt2.lng);

    const angle = window.google.maps.geometry.spherical.computeHeading(
      pt1LatLng,
      pt2LatLng
    );
    const actualAngle = angle - 90;

    const marker = document.querySelector(`[src="${icon1.url}"]`);

    if (marker) {
      // when it hasn't loaded, it's null
      marker.style.transform = `rotate(${actualAngle}deg)`;
    }
  };

  return (
    <Card className="bg-gray-900">
      <button
        onClick={startSimulation}
        className="bg-[#C0C781] w-full hover:bg-[#cbd288] text-gray-800 flex justify-center items-center font-bold py-2 px-4 rounded"
      >
        <svg
          fill="#000000"
          height="24px"
          width="24px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
              c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
              C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"
            />
            <path
              d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
              S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
            />
          </g>
        </svg>
        <span className="ml-4">{tripStart ? `Restart` : `Start`} Trip</span>
      </button>

      <div className="gMapCont">
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: centerPathLat, lng: centerpathLng }}
        >
          <div className="tripInfoCont">
            <header>Nyabugogo - Kimironko</header>
            <div>
              <div>
                Next Stop: <strong>{nextStop}</strong>
              </div>
              <div>
                Constant Velocity: <strong>{velocity * 3.6} km/h</strong>
              </div>
            </div>
            <div>
              <div>
                Distance: <strong>{(dist / 1000).toFixed(2)} km</strong>
              </div>
              <div>
                Time: <strong>{time.toFixed(2)} s</strong>
              </div>
            </div>
          </div>

          <Polyline
            path={paths}
            options={{
              strokeColor: "#0088FF",
              strokeWeight: 6,
              strokeOpacity: 0.6,
              defaultVisible: true,
            }}
          />

          {stops.data.map((stop, index) => (
            <Marker
              key={index}
              position={{
                lat: stop.lat,
                lng: stop.lng,
              }}
              title={stop.id}
              label={index === 0 ? "Ny" : "Ki"}
            />
          ))}

          {paths
            .filter((p, i) => i !== 0 && i !== paths.length - 1)
            .map((path, index) => (
              <Marker
                key={index}
                position={{
                  lat: path.lat,
                  lng: path.lng,
                }}
                title="bus stop"
                icon={"https://iili.io/JSXXMYb.png"}
              />
            ))}

          {progress && (
            <>
              <Polyline path={progress} options={{ strokeColor: "orange" }} />

              <Marker icon={icon1} position={progress[progress.length - 1]} />
            </>
          )}
        </GoogleMap>
      </div>
    </Card>
  );
};

export default withScriptjs(withGoogleMap(Map));
