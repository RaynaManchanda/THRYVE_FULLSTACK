// 👉 Function to create (mount) a chart inside a given HTML element
function mount(id, chartConfig) {
  // Find the HTML element by its ID (for example, <canvas id="goalRing">)
  const el = document.getElementById(id);

  // If that element does not exist, just stop (do nothing)
  if (!el) return;

  // Get the drawing area (canvas context) from that element
  const ctx = el.getContext('2d');

  // Create a new chart using Chart.js
  // chartConfig contains the type, data, and options of the chart
  new Chart(ctx, chartConfig);
}

// =======================
// 📊 DASHBOARD CHARTS
// =======================

// 🟦 1. Goal Progress Ring (shows completed vs remaining steps)
mount('goalRing', {
  type: 'doughnut', // Type of chart: circular donut chart
  data: {
    labels: ['Completed', 'Remaining'], // Two parts of the ring
    datasets: [{
      data: [8247, 1753], // Values for each part (completed & remaining)
      borderWidth: 0       // Remove border line between segments
    }]
  },
  options: {
    plugins: {
      legend: { display: false }, // Hide the label box
      tooltip: { enabled: false } // Disable hover tooltips
    },
    cutout: '70%' // Makes the donut’s center hollow (70% empty)
  }
});

// 🟨 2. Weekly Steps Bar Chart (shows steps from Sep 21–27)
mount('weeklySteps', {
  type: 'bar', // Bar chart
  data: {
    labels: ['Sep 21','Sep 22','Sep 23','Sep 24','Sep 25','Sep 26','Sep 27'], // Days of week
    datasets: [{
      label: 'Steps', // Data label
      data: [10671,9800,11500,8700,12800,12100,11300] // Step counts per day
    }]
  },
  options: {
    scales: {
      x: { grid: { display: false } }, // Hide vertical grid lines
      y: { beginAtZero: true }         // Y-axis starts at 0
    },
    plugins: {
      legend: { display: false }       // Hide legend box
    }
  }
});

// ❤️ 3. Heart Rate Today (line chart showing BPM throughout the day)
mount('hrToday', {
  type: 'line', // Line chart
  data: {
    labels: ['6AM','9AM','12PM','3PM','6PM','9PM'], // Time of day
    datasets: [{
      label: 'BPM', // Beats per minute
      data: [68,72,78,75,73,71], // Heart rate readings
      tension: .35,              // Smooth curve instead of sharp lines
      pointRadius: 0             // Hide dots on data points
    }]
  },
  options: {
    scales: {
      x: { grid: { display: false } }, // Hide x-axis grid
      y: { suggestedMin: 60, suggestedMax: 90 } // Y-axis range (approx)
    },
    plugins: {
      legend: { display: false } // Hide legend
    }
  }
});

// 🔄 4. Combined Chart (Steps + Heart Rate + Stress %)
mount('stressCombo', {
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], // Days of week
    datasets: [
      { // Bar chart for steps
        type: 'bar',
        label: 'Steps',
        data: [12000,9000,15000,10000,13000,14000,11000]
      },
      { // Line chart for heart rate
        type: 'line',
        label: 'HR',
        data: [70,68,73,69,71,74,72],
        yAxisID: 'y1',  // Use separate Y-axis on right side
        tension: .3     // Smooth line
      },
      { // Dashed line for stress percentage
        type: 'line',
        label: 'Stress %',
        data: [22,20,28,21,24,26,25],
        yAxisID: 'y2',  // Use another Y-axis
        borderDash: [4,4], // Dotted line style
        tension: .3
      }
    ]
  },
  options: {
    scales: {
      x: { grid: { display: false } }, // Hide x grid
      y: { beginAtZero: true },        // Start y-axis at 0
      y1: { // Second axis (right side) for HR
        position: 'right',
        suggestedMin: 60,
        suggestedMax: 90,
        grid: { drawOnChartArea: false } // Don’t overlap grid lines
      },
      y2: { // Hidden third axis for Stress %
        position: 'right',
        min: 0,
        max: 100,
        display: false
      }
    }
  }
});

// =======================
// 💤 RECOVERY CHARTS
// =======================

// 🟣 5. Sleep Donut Chart (Deep, REM, Light, Awake)
mount('sleepDonut', {
  type: 'doughnut',
  data: {
    labels: ['Deep Sleep','REM','Light','Awake'],
    datasets: [{
      data: [113,90,238,45], // Minutes in each sleep stage
      borderWidth: 0
    }]
  },
  options: {
    plugins: { legend: { position: 'right' } }, // Show legend on right
    cutout: '55%' // Smaller donut hole
  }
});

// 🧡 6. Strain vs Recovery Chart
mount('strainVsRecovery', {
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [
      { // Bar for physical strain score
        type: 'bar',
        label: 'Strain',
        data: [14,20,12,9,18,24,8]
      },
      { // Line for recovery percentage
        type: 'line',
        label: 'Recovery %',
        data: [70,65,78,72,68,60,82],
        yAxisID: 'y1',  // Right-side Y-axis
        tension: .3
      }
    ]
  },
  options: {
    scales: {
      x: { grid: { display: false } }, // Hide x grid
      y: { beginAtZero: true },        // Left Y-axis starts from 0
      y1: {                            // Right Y-axis for %
        position: 'right',
        min: 0,
        max: 100,
        grid: { drawOnChartArea: false } // Prevent overlap
      }
    }
  }
});

// 💚 7. Recovery Timeline (line chart for % recovery through the day)
mount('recoveryTimeline', {
  type: 'line',
  data: {
    labels: ['12AM','3AM','6AM','9AM','12PM','3PM','6PM','9PM'], // Times
    datasets: [{
      label: 'Recovery %',
      data: [100,98,88,84,80,76,72,70], // Gradual drop
      tension: .3,                      // Smooth line
      pointRadius: 0                    // Hide dots
    }]
  },
  options: {
    scales: {
      x: { grid: { display: false } }, // Hide x grid
      y: { min: 0, max: 100 }          // Y-axis range 0–100%
    },
    plugins: { legend: { display: false } } // Hide legend
  }
});

// 💙 8. HRV Trend (Heart Rate Variability trend over the week)
mount('hrvTrend', {
  type: 'line',
  data: {
    labels: ['Tue','Wed','Thu','Fri','Sat','Sun','Mon'], // Days
    datasets: [{
      label: 'HRV',              // HRV = heart rate variability
      data: [40,42,41,39,38,43,45], // HRV readings
      tension: .35,               // Smooth curve
      pointRadius: 3              // Show small dots
    }]
  },
  options: {
    scales: {
      x: { grid: { display: false } }, // Hide x grid
      y: { beginAtZero: false }        // Start Y-axis near data, not from 0
    },
    plugins: { legend: { display: false } } // Hide legend
  }
});
