document.addEventListener('DOMContentLoaded', () => {
    const reportDataDiv = document.getElementById('reportData');
    let currentReport = null;

    document.getElementById('reportButton').addEventListener('click', () => {
        fetchDataAndRenderTable('http://localhost:8080/analytics', 'analytics');
    });

    document.getElementById('reportButtonPbjs').addEventListener('click', () => {
        fetchDataAndRenderTable('http://localhost:8080/pbjsAnalytics', 'pbjsAnalytics');
    });

    function fetchDataAndRenderTable(url, reportType) {
        if (currentReport === reportType) {
            reportDataDiv.innerHTML = '';
            currentReport = null;
            return;
        }

        fetch(url)
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
                        currentReport = reportType;
                        return;
                    }

                    const table = createTable(data);
                    reportDataDiv.appendChild(table);
                    currentReport = reportType;

                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    reportDataDiv.innerHTML = '<p>Error parsing data</p>';
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                reportDataDiv.innerHTML = '<p>Error fetching data</p>';
            });
    }

    function createTable(data) {
        const tableContainer = document.createElement('div');

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginBottom = '10px';
        closeButton.addEventListener('click', () => {
            reportDataDiv.innerHTML = '';
            currentReport = null;
        });

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

        tableContainer.appendChild(closeButton);
        tableContainer.appendChild(table);

        return tableContainer;
    }
});
