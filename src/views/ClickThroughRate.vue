<template>
  <!-- Wrapper for both charts -->
  <div class="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 space-y-8 md:space-x-8 md:space-y-0">
    <!-- Feature Importance Chart -->
    <div class="w-full md:w-1/2 p-4 shadow-lg rounded-lg bg-white">
      <h2 class="text-center font-bold text-xl mb-4">Top 10 Feature Importances for Click Prediction</h2>
      <canvas id="featureImportanceChart"></canvas>
    </div>

    <!-- Ad Spend vs Clicks Chart -->
    <div class="w-full md:w-1/2 p-4 shadow-lg rounded-lg bg-white">
      <h2 class="text-center font-bold text-xl mb-4">Ad Spend vs Clicks with Trendline</h2>
      <canvas id="adSpendVsClicksChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ScatterController, LineController, PointElement, LineElement } from 'chart.js';
import regression from 'regression'; // For trendline

// Register components for Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ScatterController, LineController, PointElement, LineElement);

export default {
  data() {
    return {
      featureImportanceData: [],
      adSpendData: [],
      clicksData: []
    };
  },
  mounted() {
    this.fetchFeatureImportanceData();
    this.fetchAdSpendData();
  },
  methods: {
    async fetchFeatureImportanceData() {
      try {
        const response = await fetch('https://klaviyo-django-758b15dfdb44.herokuapp.com/api/feature_importances/');
        if (!response.ok) throw new Error('Failed to fetch feature importance data.');
        const data = await response.json();
        this.featureImportanceData = data;
        this.renderFeatureImportanceChart();
      } catch (error) {
        console.error('Error fetching feature importance data:', error);
      }
    },
    renderFeatureImportanceChart() {
      const labels = this.featureImportanceData.map(item => item.Feature);
      const values = this.featureImportanceData.map(item => item.Importance);
      
      new Chart(document.getElementById('featureImportanceChart'), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Importance',
              data: values,
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
                gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
                return gradient;
              },
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              borderRadius: 10,
            }
          ]
        },
        options: {
          animation: {
            duration: 1500,
            easing: 'easeInOutQuad',
          },
          scales: { 
            x: { 
              title: { display: true, text: 'Feature' },
              grid: { display: false }
            },
            y: { 
              title: { display: true, text: 'Importance' },
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              },
              grid: { color: 'rgba(0, 0, 0, 0.1)' }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: { size: 16, weight: 'bold' },
              bodyFont: { size: 14 },
              cornerRadius: 10,
              displayColors: false
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
    async fetchAdSpendData() {
      try {
        const response = await fetch('https://klaviyo-django-758b15dfdb44.herokuapp.com/api/ad_spend_vs_clicks/');
        if (!response.ok) throw new Error('Failed to fetch ad spend vs clicks data.');
        const data = await response.json();
        this.adSpendData = data.spent;
        this.clicksData = data.clicks;
        this.renderAdSpendChart();
      } catch (error) {
        console.error('Error fetching ad spend vs clicks data:', error);
      }
    },
    renderAdSpendChart() {
      const scatterData = this.adSpendData.map((spent, index) => ({ x: spent, y: this.clicksData[index] }));
      const regressionData = regression.linear(scatterData.map((point) => [point.x, point.y]));
      const regressionLine = regressionData.points.map(point => ({ x: point[0], y: point[1] }));

      new Chart(document.getElementById('adSpendVsClicksChart'), {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Ad Spend vs Clicks',
              data: scatterData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 6,
              hoverRadius: 8,
            },
            {
              label: 'Trendline',
              data: regressionLine,
              type: 'line',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 3,
              fill: false,
              pointRadius: 0,
            }
          ]
        },
        options: {
          animation: {
            duration: 2000,
            easing: 'easeInOutBounce',
          },
          scales: {
            x: { 
              title: { display: true, text: 'Ad Spend' },
              type: 'linear',
              grid: { display: false }
            },
            y: { 
              title: { display: true, text: 'Clicks' },
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.1)' }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: { size: 16, weight: 'bold' },
              bodyFont: { size: 14 },
              cornerRadius: 10,
              displayColors: false
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }
};
</script>

<style scoped>
/* Set canvas height to fit within their containers */
canvas {
  max-width: 100%;
  max-height: 500px;
}

/* Styling for chart containers */
div {
  background-color: #f9fafb;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
