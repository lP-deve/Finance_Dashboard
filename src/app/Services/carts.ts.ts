import { ChartConfiguration, Legend } from 'chart.js';

export const getBalanceChartConfig = (ctx: CanvasRenderingContext2D, data: number[]): ChartConfiguration => {
  const lineGradient = ctx.createLinearGradient(0, 4, 400, 400);
  lineGradient.addColorStop(0, 'rgb(255, 255, 255)');
  lineGradient.addColorStop(0.5, 'rgb(73, 28, 255)');
  lineGradient.addColorStop(1, 'rgb(76, 40, 208)');

  return {
    type: 'line',
    data: {
      // FIX 1: Change labels to empty strings so M1, M2, etc. don't show
      labels: data.map(() => ''), 
      datasets: [{
        label: 'Balance',
        data: data,
        borderWidth: 8,
        borderColor: lineGradient,
        tension: 0.2,
        pointRadius: 6,
        pointBackgroundColor: "#fecd07",
        pointBorderWidth: 2,
        borderCapStyle: 'round',
        borderJoinStyle: 'round'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        // FIX 2: This specifically removes the legend square and text
        legend: { 
          display: false 
        },
        tooltip: {
          backgroundColor: '#9fb4e8',
          padding: 12,
          displayColors: false, // This removes the square inside the tooltip too
          callbacks: {
            title: () => '',
            label: (context: any) => `Balance: ${context.parsed.y.toLocaleString()} ₾`
          }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(154, 151, 151, 0.47)' },
          ticks: { callback: (val) => val.toLocaleString() + ' ₾' }
        },
        x: { 
          grid: { display: false }, 
          ticks: { display: false } // Ensures no labels or tick marks appear on X-axis
        }
      }
    }
  };
};

export const getCategoryChartConfig = (labels: string[], amounts: number[]): ChartConfiguration => {
  // Check if there is any actual data
  const hasData = amounts.length > 0 && amounts.some(val => val > 0);

  return {
    type: 'doughnut',
    data: {
      // If no data, show a single "No Data" label, otherwise use real labels
      labels: hasData ? labels : ['No Data Recorded'],
      datasets: [{
        // If no data, show a full circle (value of 1), otherwise use real amounts
        data: hasData ? amounts : [1],
        backgroundColor: hasData 
          ? ['#4f46e5', '#416257', '#eb9705', '#990505', '#7037f6', '#05c0e1'] 
          : ['#e5e7eb'], // Neutral gray for empty state
        hoverOffset: hasData ? 20 : 0, // Disable hover effect if empty
        borderWidth: 2,
        borderColor: '#dcdcdc'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          // Hide legend if there is no data to keep it clean
          display: hasData,
          position: 'bottom',
          labels: { usePointStyle: true, padding: 15, font: { size: 10 } }
        },
        tooltip: {
          // Disable tooltips if there is no data
          enabled: hasData
        },
        title: {
          display: true,
          text: 'Where does your money go?',
          font: { size: 14, weight: 'bold' }
        }
      },
    
    }
  };
};