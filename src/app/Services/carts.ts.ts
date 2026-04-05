import { ChartConfiguration, Legend } from 'chart.js';

export const getBalanceChartConfig = (ctx: CanvasRenderingContext2D, data: number[]): ChartConfiguration => {
  const lineGradient = ctx.createLinearGradient(0, 4, 400, 400);
  lineGradient.addColorStop(0, 'rgb(252, 252, 252)');
  lineGradient.addColorStop(0.5, 'rgb(159, 6, 6)');
  lineGradient.addColorStop(1, 'rgb(43, 3, 3)');

  return {
    type: 'line',
    data: {
      labels: data.map(() => ''), 
      datasets: [{
        label: 'Balance',
        data: data,
        borderWidth: 8,
        borderColor: lineGradient,
        tension: 0.2,
        pointRadius: 6,
        pointBackgroundColor: "#c1c1c1",
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
        
        legend: { 
          display: false 
        },
        tooltip: {
          backgroundColor: '#bc220b',
          padding: 12,
          displayColors: false,
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
          ticks: { display: false } 
        }
      }
    }
  };
};

export const getCategoryChartConfig = (labels: string[], amounts: number[]): ChartConfiguration => {

  const hasData = amounts.length > 0 && amounts.some(val => val > 0);

  return {
    type: 'doughnut',
    data: {
     
      labels: hasData ? labels : ['No Data Recorded'],
      datasets: [{
        
        data: hasData ? amounts : [1],
        backgroundColor: hasData 
          ? ['#a91f04', '#eded2a', '#eb9705', '#08c825', '#dc0a42', '#05c0e1'] 
          : ['#570505'], 
        hoverOffset: hasData ? 20 : 0, 
        borderWidth: 2,
        borderColor: '#fffdfd'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          
          display: hasData,
          position: 'bottom',
          labels: { usePointStyle: true, padding: 15, font: { size: 10 } }
        },
        tooltip: {
          
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