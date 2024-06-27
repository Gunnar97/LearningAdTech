import "/modules/showResultBid/showResultBid.css"
import createElement from "../../services/JSX_create_config.js"
import { addToQueue } from "../../src/queueInit.js";

const appDiv = document.createElement('div');
appDiv.id = 'app';
document.body.appendChild(appDiv);
addToQueue(() => {
    wrapper.showConsole()
})


let data = [];
const timeFormatted = (currentTime) => {
    return currentTime.getHours().toString().padStart(2, '0') + ':' +
        currentTime.getMinutes().toString().padStart(2, '0') + ':' +
        currentTime.getSeconds().toString().padStart(2, '0') + '.' +
        currentTime.getMilliseconds().toString().padStart(3, '0');
};

function eventData(eventType, args) {
    const eventLog = {
        time: timeFormatted(new Date()),
        placement: args.adUnitCode || args.adUnitCodes.toString() || "N/A",
        description: eventType,
        type: eventType,
        arguments: Object.entries({
            bidderCode: args.bidderCode || "N/A",
            statusMessage: args.statusMessage || "N/A",
            adId: args.adId || "N/A",
            requestId: args.requestId || "N/A",
            transactionId: args.transactionId || "N/A",
            adUnitId: args.adUnitId || "N/A",
            mediaType: args.mediaType || "N/A",
        }).map(([key, value]) => `${key}: ${value}`).join(', ')
        ,
    };
    if (eventLog.placement !== "N/A") {
        data.push(eventLog);
    }
    console.log(eventLog)
    renderConsol()
}


export const renderConsol = () => {
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


function TableComponent(data) {
    return (
        <div class="table-container">
            <h2>Prebid события</h2>
            <button class="close-button">×</button>
            <table class="event-table">
                <thead>
                <tr class="head-list">
                    <th class="head-item">Время события</th>
                    <th class="head-item">Placement</th>
                    <th class="head-item">Тип события</th>
                    <th class="head-item">Описание события</th>
                    <th class="head-item">Аргументы события</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td class="body-item">{item.time}</td>
                        <td class="body-item">{item.placement}</td>
                        <td class="body-item">{item.type}</td>
                        <td class="body-item">{item.description}</td>
                        <td class="body-item">{item.arguments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}


function TableButton() {
    return (
        <button class="show-button">Show Table</button>
    )
}


window.pbjs.que.push(() => {
    pbjs.onEvent("auctionInit", (args) => eventData("auctionInit", args));
    pbjs.onEvent("auctionEnd", (args) => eventData("auctionEnd", args));
    pbjs.onEvent("bidWon", (args) => eventData("bidWon", args));

})

window.wrapper.showConsole = () => {
    renderConsol()
}
