<template>
    <div>
      <h2>Ad Spend vs Clicks with Trendline</h2>
      <canvas id="adSpendVsClicksChart"></canvas> <!-- Canvas for Chart.js -->
    </div>
  </template>
  
  <script>
  // Import specific parts of Chart.js v3.x+
  import { Chart, ScatterController, LineController, PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
  import regression from 'regression'; // Import a simple regression library to calculate the trendline
  
  // Register Chart.js components and scales
  Chart.register(ScatterController, LineController, PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
  export default {
    data() {
      return {
        adSpendData: [],
        clicksData: []
      };
    },
    mounted() {
      // Fetch the data when the component is mounted
      this.fetchAdSpendData();
    },
    methods: {
      async fetchAdSpendData() {
        try {
          // Use fetch to send a GET request to the Django API endpoint
          const response = await fetch('https://klaviyo-django-758b15dfdb44.herokuapp.com/api/ad_spend_vs_clicks/');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          // Parse the response as JSON
          const data = await response.json();
          this.adSpendData = data.spent;
          this.clicksData = data.clicks;
  
          // After fetching data, call the method to render the chart
          this.renderChart();
        } catch (error) {
          console.error('Error fetching Ad Spend vs Clicks data:', error);
        }
      },
      renderChart() {
        const scatterData = this.adSpendData.map((spent, index) => ({ x: spent, y: this.clicksData[index] }));
  
        // Calculate the regression line
        const regressionData = regression.linear(scatterData.map((point) => [point.x, point.y]));
        const regressionLine = regressionData.points.map((point) => ({ x: point[0], y: point[1] }));
  
        // Render the chart using Chart.js
        new Chart(document.getElementById('adSpendVsClicksChart'), {
          type: 'scatter', // Scatter plot
          data: {
            datasets: [
              {
                label: 'Ad Spend vs Clicks',
                data: scatterData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Point color
                borderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 4, // Scatter point size
                showLine: false, // Don't show line for scatter points
              },
              {
                label: 'Trendline',
                data: regressionLine, // Regression line points
                type: 'line', // Line for trendline
                borderColor: 'rgba(255, 99, 132, 1)', // Trendline color
                borderWidth: 2,
                fill: false,
                pointRadius: 0, // Hide points on the regression line
              }
            ],
          },
          options: {
            scales: {
              x: {
                type: 'linear', // Linear scale for 'spent'
                title: {
                  display: true,
                  text: 'Ad Spend',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Clicks',
                },
                beginAtZero: true,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 1200px;
    max-height: 600px;
  }
  </style>
  