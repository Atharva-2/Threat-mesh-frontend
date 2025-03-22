import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ThreatTypeChart = ({ threats }) => {
  // Count the number of threats by type
  const typeCounts = threats.reduce(
    (acc, threat) => {
      acc[threat.type] = (acc[threat.type] || 0) + 1;
      return acc;
    },
    { Ransomware: 0, Phishing: 0, Other: 0 }
  );

  // Chart data
  const data = {
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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
  };

  return (
    <></>
    // <div className="chart-container">
    //   <h3>Threats by Attack Type</h3>
    //   <Pie data={data} options={options} />
    // </div>
  );
};

export default ThreatTypeChart;
