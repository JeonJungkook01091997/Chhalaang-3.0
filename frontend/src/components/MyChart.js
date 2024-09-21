import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Bar, Line, Doughnut } from "react-chartjs-2"; // Import the chart type

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyChart = ({ xlabels,ylabels,title }) => {
    // let xlabelsArray = data.map((item) => item.label);
    // let ylabelsArray =  data.map((item) => item.value);

    let xlabelsArray = xlabels;
    let ylabelsArray =  ylabels;

// Transform your custom array of objects into chart data
const chartData = {
    labels: xlabelsArray, 
    datasets: [{
        label: 'Fleet data',
        data: ylabelsArray,
        backgroundColor: [
            'rgba(43, 63, 299, 0.8)', // Fixed the rgba format
            'rgba(250, 192, 19, 0.8)',
            'rgba(253, 135, 135, 0.8)', // Added the closing parenthesis
        ],
        borderRadius: 5,
        // borderColor: 'rgba(255, 99, 132, 1)',
        // borderWidth: 3,
        fill: true
    }]
};


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },

    },
  };

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            m: 2,
            height: "250px",
          },
        }}
      >
        <Paper elevation={3} className="px-3">
          <Typography variant="subtitle2" gutterBottom className="pt-2">
            {title}
          </Typography>

          <Box sx={{ width: "100%",height:"100%" }}>
            <Bar data={chartData} options={options} />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default MyChart;
