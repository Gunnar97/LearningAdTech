import {adUnitsCache, runAuction, runAuctionDebounced} from "./runAuction.js";
import {adUnitsF} from "./adUnits.js";
import {CONFIG} from "./constant.js";

export const run = (adUnitPath, sizes) => {
    adUnitsCache.push(adUnitsF(adUnitPath, sizes))
    if (CONFIG.sra) {
        runAuctionDebounced();
        return new Promise((resolve) => {
            pbjs.onEvent('auctionEnd', (...args) => {
                if (!args[0].adUnitCodes.includes(adUnitPath)) return;
                resolve()
            })
        })
    } else {
        return runAuction();
    }
}