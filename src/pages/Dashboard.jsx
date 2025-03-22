import ThreatMap from "../components/ThreatMap";
import MapComponent from "../components/Map";
import ThreatSeverity from "../components/ThreatList";
// import ThreatMap from "../components/ThreatMap";
import "../styles/main.css";
import React, { useEffect, useState } from "react";
import ThreatSeverityChart from "../components/ThreatSeverityGraph";
// import ThreatTypeChart from "../components/ThreatTypeChart";
// import "../styles/map.css";

const Dashboard = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/threats/list")
      .then((res) => res.json())
      .then((data) => {
        setThreats(data.threats);
      })
      .catch((error) => console.error("Error fetching threats:", error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Threat Detection Map</h1>
      {/* <ThreatMap /> */}

      <div class="container">
        <div class="box mapbox-map">
          <MapComponent />
        </div>
        <div class="box threats-severity">
          <ThreatSeverity />
        </div>
        <div class="box fixed-map">
          <div className="glass-box threat-list">
            <h2>Threat List</h2>
            <ThreatSeverityChart threats={threats} />
          </div>
        </div>
        <div class="box others">{/* <ThreatTypeChart /> */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
