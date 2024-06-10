import createElement from "/services/JSX_create_config.js"
import "/modules/showResultBid/showResultBid.css"

const appDiv = document.getElementById('app');


function handleShowClick() {
    appDiv.innerHTML = '';
    appDiv.appendChild(TableComponent());
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', handleClick);
    } else {
        console.log('Кнопка закрытия не найдена');
    }
}

function handleClick() {
    appDiv.innerHTML = '';
    appDiv.appendChild(TableButton());
    const showButton = document.querySelector('.show-button');
    if (showButton) {
        showButton.addEventListener('click', handleShowClick);
    } else {
        console.log('Кнопка закрытия не найдена');
    }
}

window.wrapper.showConsole = () => {
    appDiv.innerHTML = '';
    appDiv.appendChild(TableComponent());
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', handleClick);
    } else {
        console.log('Кнопка закрытия не найдена');
    }
}


export  function TableComponent() {
    const data = [
        {
            id: 1,
            eventTime: '2024-06-10T08:30:00',
            placement: 'Top',
            eventType: 'Click',
            eventDescription: 'User clicked on button',
            eventArguments: 'Button ID: 123'
        },
        {
            id: 2,
            eventTime: '2024-06-11T10:15:00',
            placement: 'Bottom',
            eventType: 'Hover',
            eventDescription: 'User hovered over image',
            eventArguments: 'Image ID: 456'
        },

    ];

    return (
        <div class ="table-container">
            <h2>Prebid события</h2>
            <button class ="close-button">×</button>
            <table class ="event-table">
                <thead>
                <tr class ="head-list">
                    <th class ="head-item">Время события</th>
                    <th class ="head-item">Placement</th>
                    <th class ="head-item">Тип события</th>
                    <th class ="head-item">Описание события</th>
                    <th class ="head-item">Аргументы события</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td class ="body-item">{item.eventTime}</td>
                        <td class ="body-item">{item.placement}</td>
                        <td class ="body-item">{item.eventType}</td>
                        <td class ="body-item">{item.eventDescription}</td>
                        <td class ="body-item">{item.eventArguments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}


export  function TableButton() {
    return (
        <button class="show-button">Show Table</button>
    )
}