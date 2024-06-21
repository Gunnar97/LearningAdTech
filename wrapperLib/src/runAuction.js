import {initAdserver} from "./initAdserver.js";
import {PREBID_TIMEOUT} from "./constant.js";
import {debounce} from "./debounce.js";

export const adUnitsCache = [];

export function runAuction() {
    return new Promise((resolve) => {
        const adUnits = [...adUnitsCache];
        adUnitsCache.length = 0;
        pbjs.requestBids({
            adUnits: adUnits,
            bidsBackHandler: (...args) => {
                initAdserver(...args)
                resolve()
            },
            timeout: PREBID_TIMEOUT,
        });
    })
}

export const runAuctionDebounced = debounce(runAuction, 10);