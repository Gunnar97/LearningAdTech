import "virtual:plugins";
import { div_1_sizes, div_2_sizes, PREBID_TIMEOUT } from "/src/constant.js";
import { adUnitsF } from "/src/adUnits.js";
// import { renderWinningBids } from "/src/renderWinningBids.js";
// import "./src/queue.js";
// import { logEvent, showConsole } from "./src/eventConsole.js";


function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const placementsCache = [];

function runAuction() {
    const elementIds = placementsCache.slice(0);
    placementsCache.length = 0;
    pbjs.requestBids({
        adUnits: adUnitsF(div_1_sizes, div_2_sizes).filter((adUnit) => elementIds.includes(adUnit.code)),
        bidsBackHandler: initAdserver,
        timeout: PREBID_TIMEOUT,
    });
}


function initAdserver() {
    if (pbjs.initAdserverSet) return;
    pbjs.initAdserverSet = true;
    googletag.cmd.push(function() {
        pbjs.que.push(function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}



const runAuctionDebounced = debounce(runAuction, 10);

export function auctionForPlacement(elementId) {
    pbjs.que.push(() => {
        placementsCache.push(elementId);
        if (wrapper.SRA) {
            logEvent("auctionIntent", { adUnitCode: elementId });
            runAuctionDebounced();
        } else {
            runAuction();
        }
    });
}

window.wrapper = window.wrapper || {};
wrapper.cmd = wrapper.cmd || [];
wrapper.auctionForPlacement = auctionForPlacement;
// wrapper.showConsole = showConsole;

// pbjs.processQueue();
