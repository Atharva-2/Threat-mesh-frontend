import React, { useEffect, useState } from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchThreats } from "../utils/api";
import "../styles/map.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXRodTIwIiwiYSI6ImNtOGk3bjZkYjAyaXkybXNpa3ZpNmlrNHcifQ.VTJ41oGnpBXQGFnLFdFyZg";

const MapComponent = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/threats/list")
      .then((res) => res.json())
      .then((data) => {
        console.log("Threats received:", data.threats);
        setThreats(data.threats);
      })
      .catch((error) => console.error("Error fetching threats:", error));
  }, []);

  return (
    <div className="main-container">
      <MapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 78.9629,
          latitude: 20.5937,
          zoom: 5,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {threats.slice(-5).map((threat, index) =>
          threat.location?.lat && threat.location?.lon ? (
            <Marker
              key={index}
              latitude={threat.location.lat}
              longitude={threat.location.lon}
            >
              <div className="blinking-marker">⚠</div>
            </Marker>
          ) : null
        )}
      </MapGL>
    </div>
  );
};

export default MapComponent;
