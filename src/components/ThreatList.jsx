import React, { useState, useEffect } from "react";
import "../styles/threatSeverity.css"; // Ensure your CSS file is updated

const ThreatSeverity = () => {
  const [threats, setThreats] = useState([]);
  const [hoveredThreat, setHoveredThreat] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/threats/list")
      .then((res) => res.json())
      .then((data) => {
        setThreats(data.threats);
      })
      .catch((error) => console.error("Error fetching threats:", error));
  }, []);

  // Handle mouse hover to track position
  const handleMouseEnter = (threat, event) => {
    // console.log("hovered");
    setHoveredThreat(threat);
    setTooltipPosition({ x: event.clientX + 10, y: event.clientY + 10 });
  };

  const handleMouseLeave = () => {
    setHoveredThreat(null);
  };

  return (
    <div className="threat-severity-container">
      <h2>Recent Threats</h2>
      <ul className="threat-list">
        {threats.map((threat, index) => (
          <li
            key={index}
            className="threat-item"
            onMouseEnter={(e) => handleMouseEnter(threat, e)}
            onMouseMove={(e) =>
              setTooltipPosition({ x: e.clientX + 10, y: e.clientY + 10 })
            }
            onMouseLeave={handleMouseLeave}
          >
            {threat.type} -{" "}
            <span className={`severity ${threat.severity.toLowerCase()}`}>
              {threat.severity}
            </span>
          </li>
        ))}
      </ul>

      {hoveredThreat && (
        <div
          className="threat-tooltip"
          style={{
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
          }}
        >
          <h3>{hoveredThreat.name}</h3>
          <p>
            <strong>Severity:</strong> {hoveredThreat.severity}
          </p>
          <p>
            <strong>Location:</strong> {hoveredThreat.location?.lat},{" "}
            {hoveredThreat.location?.lon}
          </p>
          <p>
            <strong>Description:</strong> {hoveredThreat.description}
          </p>
          <p>
            <strong>Time:</strong> {hoveredThreat.reportedAt}
          </p>
        </div>
      )}
    </div>
  );
};

export default ThreatSeverity;
