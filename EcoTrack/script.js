let chartInstance = null;

function calculateFootprint() {
  const carKm = parseFloat(document.getElementById("carKm").value) || 0;
  const electricity = parseFloat(document.getElementById("electricity").value) || 0;
  const plastic = parseFloat(document.getElementById("plastic").value) || 0;
  const meat = parseFloat(document.getElementById("meat").value) || 0;
  const flights = parseFloat(document.getElementById("flights").value) || 0;

  // CO2 estimates (kg CO2 per unit)
  const carbonFromCar = carKm * 0.21;
  const carbonFromElectricity = electricity * 0.45;
  const carbonFromPlastic = plastic * 0.1;
  const carbonFromMeat = meat * 0.027;
  const carbonFromFlights = flights * 90;

  const total = carbonFromCar + carbonFromElectricity + carbonFromPlastic + carbonFromMeat + carbonFromFlights;

  // Show result
  document.getElementById("resultSection").style.display = "block";
  document.getElementById("resultText").innerText = Your estimated daily carbon footprint is ${total.toFixed(2)} kg CO₂.;

  // Draw chart
  const ctx = document.getElementById("carbonChart").getContext("2d");

  if (chartInstance) chartInstance.destroy(); // Avoid multiple charts

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Car Travel', 'Electricity', 'Plastic', 'Meat', 'Flights'],
      datasets: [{
        label: 'kg CO₂',
        data: [
          carbonFromCar.toFixed(2),
          carbonFromElectricity.toFixed(2),
          carbonFromPlastic.toFixed(2),
          carbonFromMeat.toFixed(2),
          carbonFromFlights.toFixed(2)
        ],
        backgroundColor: [
          '#66bb6a', '#42a5f5', '#ff7043', '#ab47bc', '#ffa726'
        ],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#333'
          }
        },
        x: {
          ticks: {
            color: '#333'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: context => ${context.parsed.y} kg CO₂
          }
        }
      }
    }
  });
}