document.addEventListener('DOMContentLoaded', () => {
    let myChart;

    const createGraph = (url) => {
        fetch(url)
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

                if (myChart) {
                    myChart.destroy();
                }

                myChart = new Chart(ctx, {
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
                                    text: 'Number of Events'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time (hours)'
                                }
                            }
                        }
                    }
                });

                document.getElementById('eventChartContainer').style.display = 'block';
                document.getElementById('closeButton').style.display = 'inline-block';
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    document.getElementById('graphButton1').addEventListener('click', () => {
        const ANAL_URL_1 = 'http://localhost:8080/analytics';
        createGraph(ANAL_URL_1);
    });

    document.getElementById('graphButton2').addEventListener('click', () => {
        const ANAL_URL_2 = 'http://localhost:8080/pbjsAnalytics';
        createGraph(ANAL_URL_2);
    });

    document.getElementById('closeButton').addEventListener('click', () => {
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
        document.getElementById('eventChartContainer').style.display = 'none';
        document.getElementById('closeButton').style.display = 'none';
    });
});
