import "/modules/showResultBid/showResultBid.css"
import createElement from "/services/JSX_create_config.js"
import {getData} from "./getData.js";

const appDiv = document.getElementById('app');

let isDataLoaded = false;
let data = [];


window.wrapper.showConsole = async () => {
    try {
        data = await getData();
    } catch (error) {
        console.error(error);
    }
    appDiv.innerHTML = '';
    appDiv.appendChild(TableComponent(data));
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', handleClick);
    }
}




function handleShowClick() {
    appDiv.innerHTML = '';
    appDiv.appendChild(TableComponent(data));
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
    }
}



export  function TableComponent(data) {

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
                {data.map((item, index) => (
                    <tr key={index}>
                        <td class ="body-item">{item.timeS}</td>
                        <td class ="body-item">{item.placement}</td>
                        <td class ="body-item">{item.type}</td>
                        <td class ="body-item">{item.description}</td>
                        <td class ="body-item">{item.arguments}</td>
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