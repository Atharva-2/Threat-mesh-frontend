import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ThreatSeverityChart = ({ threats }) => {
  // Count the number of threats by severity
  const severityCounts = threats.reduce(
    (acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    },
    { High: 0, Medium: 0, Low: 0 }
  );

  // Chart data
  const graph_data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Threat Count",
        data: [severityCounts.High, severityCounts.Medium, severityCounts.Low],
        backgroundColor: ["#FF4C4C", "#FFD700", "#4CAF50"], // Red, Yellow, Green
        borderRadius: 5,
      },
    ],
  };

  const graph_options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  const typeCounts = threats.reduce(
    (acc, threat) => {
      acc[threat.type] = (acc[threat.type] || 0) + 1;
      return acc;
    },
    { Ransomware: 0, Phishing: 0, Other: 0 }
  );

  // Chart data
  const chart_data = {
    labels: ["Ransomware", "Phishing", "Other"],
    datasets: [
      {
        label: "Threat Count",
        data: [typeCounts.Ransomware, typeCounts.Phishing, typeCounts.Other],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Red, Blue, Yellow
        hoverOffset: 4,
      },
    ],
  };

  const chart_options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div>
      <div className="chart-container">
        <h3>Threat Severity Overview</h3>
        <Bar data={graph_data} options={graph_options} />
      </div>

      {/* <div className="graph-container">
        <h3>Threats by Attack Type</h3>
        <Pie data={chart_data} options={chart_options} />
      </div> */}
    </div>
  );
};

export default ThreatSeverityChart;
