"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RenderChart = () => {
  const chartRef = useRef(null);
  let chartInstance: null | Chart = null;

  useEffect(() => {
    const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext(
      "2d"
    );

    // Generate random data
    const data = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 100)
    );

    chartInstance = new Chart(ctx!, {
      type: "line",
      data: {
        labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],
        datasets: [
          {
            label: "Ranking",
            data: data,
            backgroundColor: [
              "rgba(245, 238, 39, 0.8)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(0, 0, 0, 0)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(245, 238, 39, 0.8)",
            //   "rgba(54, 162, 235, 1)",
            //   "rgba(255, 206, 86, 1)",
            //   "rgba(75, 192, 192, 1)",
            //   "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      // Clean up and destroy chart when component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default RenderChart;