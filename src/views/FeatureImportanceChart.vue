<template>
    <div>
      <h2>Top 10 Feature Importances for Click Prediction</h2>
      <canvas id="featureImportanceChart"></canvas> <!-- Canvas for Chart.js -->
    </div>
  </template>
  
  <script>
  // Import specific components and scales from Chart.js v3.x+
  import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
  
  // Register Chart.js components and scales explicitly
  Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
  export default {
    data() {
      return {
        featureImportanceData: [], // Data to be populated from the Django API
      };
    },
    mounted() {
      // Fetch the data when the component is mounted
      this.fetchFeatureImportanceData();
    },
    methods: {
      async fetchFeatureImportanceData() {
        try {
          // Use fetch to send a GET request to the Django API endpoint
          const response = await fetch('https://klaviyo-django-758b15dfdb44.herokuapp.com/api/feature_importances/');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          // Parse the response as JSON
          const data = await response.json();
          this.featureImportanceData = data;
  
          // After fetching data, call the method to render the chart
          this.renderChart();
        } catch (error) {
          console.error('Error fetching feature importance data:', error);
        }
      },
      renderChart() {
        const labels = this.featureImportanceData.map(item => item.Feature); // Extracting features
        const values = this.featureImportanceData.map(item => item.Importance); // Extracting importance
  
        // Render the chart using Chart.js
        new Chart(document.getElementById('featureImportanceChart'), {
          type: 'bar', // Bar chart
          data: {
            labels: labels, // Feature names as labels
            datasets: [
              {
                label: 'Importance',
                data: values, // Importance values
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Feature',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Importance',
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
    max-width: 800px;
    max-height: 400px;
  }
  </style>
  