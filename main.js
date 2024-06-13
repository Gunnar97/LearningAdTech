// import 'prebid.js/modules/adtelligentBidAdapter'
// import pbjs from 'prebid.js';

import "virtual:plugins";
import { div_1_sizes, div_2_sizes, PREBID_TIMEOUT } from "/src/constant.js";
import { adUnitsF } from "/src/adUnits.js";
import { renderWinningBids } from "/src/renderWinningBids.js";
import "./src/queue.js";
// import { logEvent, showConsole } from "./src/eventConsole.js";

// if(import.meta.env.VITE_ADD_RED_FRAME === '1'){
//      import('/src/debugHighlight.js')
// }
// pbjs.que.push(() => {
//   pbjs.addAdUnits(adUnitsF(div_1_sizes, div_2_sizes));
//   pbjs.requestBids({
//     bidsBackHandler: renderWinningBids,
//     timeout: PREBID_TIMEOUT,
//   });
// });

import './src/gpt_init.js'

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
        bidsBackHandler: renderWinningBids,
        timeout: PREBID_TIMEOUT,
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


