document.getElementById('graphButton').addEventListener('click', () => {
    const ANAL_URL = 'http://localhost:8080/analytics'; // Замените на ваш URL аналитики

    fetch(ANAL_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const eventsByHour = {};

            data.forEach(event => {
                const eventType = event.eventType;
                const eventTime = new Date(event.time);
                const hour = eventTime.getHours();

                if (!eventsByHour[hour]) {
                    eventsByHour[hour] = {};
                }

                if (!eventsByHour[hour][eventType]) {
                    eventsByHour[hour][eventType] = [];
                }

                eventsByHour[hour][eventType].push(event);
            });

            const hours = Object.keys(eventsByHour).sort((a, b) => a - b);
            const labels = hours.map(hour => `${hour}:00`);


            const datasets = Object.keys(data.reduce((acc, event) => {
                acc[event.eventType] = true;
                return acc;
            }, {})).map((eventType, index) => {
                const dataCounts = hours.map(hour => {
                    const events = eventsByHour[hour][eventType] || [];
                    return events.length;
                });

                return {
                    label: `Event Type ${eventType}`,
                    data: dataCounts,
                    fill: false,
                    borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
                    borderWidth: 1
                };
            });

            const ctx = document.getElementById('eventChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Число событий'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Время (часы)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
