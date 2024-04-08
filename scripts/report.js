

(async function () {
    const data = [3, 1, 4, 1, 2];
    const goal = 3

    new Chart(
        document.getElementById('report'),
        {
            type: 'bar',
            data: {
                datasets: [{
                    type: 'bar',
                    label: 'Actual hours',
                    data: data,
                    backgroundColor: data.map(hours => {
                        return hours >= goal ? 'rgba(75, 192, 192, 0.5)' : "red"
                    }),
                    order: 2
                }, {
                    type: 'line',
                    label: 'Study goal',
                    data: [3, 3, 3, 3, 3],
                    borderColor: 'green',
                    order: 1
                }],
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', "Friday"]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        suggestedMax: 5,
                        beginAtZero: true,
                    }
                }

            }
        }
    );
})();