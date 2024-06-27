let reportVisible = false; // Переменная для отслеживания состояния отчета

document.getElementById('reportButton').addEventListener('click', () => {
    const ANAL_URL = 'http://localhost:8080/analytics';
    const reportDataDiv = document.getElementById('reportData');


    if (reportVisible) {
        reportDataDiv.innerHTML = '';
        reportVisible = false;
        return;
    }

    fetch(ANAL_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(text => {
            try {
                const data = JSON.parse(text);
                reportDataDiv.innerHTML = '';

                if (data.length === 0) {
                    reportDataDiv.innerHTML = '<p>No data available</p>';
                    reportVisible = true; // Устанавливаем состояние отчета
                    return;
                }

                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';

                const headerRow = document.createElement('tr');

                const headers = Object.keys(data[0]);
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    th.style.border = '1px solid #dddddd';
                    th.style.textAlign = 'left';
                    th.style.padding = '8px';
                    th.style.backgroundColor = '#f2f2f2';
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                data.forEach(event => {
                    const row = document.createElement('tr');
                    headers.forEach(header => {
                        const td = document.createElement('td');
                        td.textContent = event[header];
                        td.style.border = '1px solid #dddddd';
                        td.style.textAlign = 'left';
                        td.style.padding = '8px';
                        row.appendChild(td);
                    });
                    table.appendChild(row);
                });

                reportDataDiv.appendChild(table);
                reportVisible = true;

            } catch (error) {
                console.error('Error parsing JSON:', error);
                reportDataDiv.innerHTML = '<p>Error parsing data</p>';
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            reportDataDiv.innerHTML = '<p>Error fetching data</p>';
        });
});
