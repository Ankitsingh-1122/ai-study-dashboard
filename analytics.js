document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Clock
    setInterval(() => {
        document.getElementById('current-time').innerText = new Date().toLocaleTimeString('en-GB');
    }, 1000);

    // 2. Line Chart (Weekly Trend)
    const lineCtx = document.getElementById('performanceLineChart').getContext('2d');
    const purpleGlow = lineCtx.createLinearGradient(0, 0, 0, 300);
    purpleGlow.addColorStop(0, 'rgba(191, 64, 255, 0.4)');
    purpleGlow.addColorStop(1, 'rgba(191, 64, 255, 0)');

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                data: [4, 7, 5, 9, 6, 11, 13],
                borderColor: '#bf40ff',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                backgroundColor: purpleGlow,
                pointBackgroundColor: '#bf40ff',
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });

    // 3. Doughnut Chart (Intensity)
    const doughnutCtx = document.getElementById('focusDoughnutChart').getContext('2d');
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Focused', 'Idle'],
            datasets: [{
                data: [94, 6],
                backgroundColor: ['#bf40ff', '#1a1a2e'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // 4. Bar Chart (Subjects)
    const barCtx = document.getElementById('subjectBarChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Coding', 'Physics', 'Design', 'Math'],
            datasets: [{
                data: [45, 25, 30, 20],
                backgroundColor: '#bf40ff',
                borderRadius: 10,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });
});