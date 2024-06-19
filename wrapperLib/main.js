import { initQueue } from '/src/queue_init.js'
import 'virtual:plugins';
import {CONFIG, PREBID_TIMEOUT} from "/src/constant.js";
import {adUnitsF} from "/src/adUnits.js";
import {renderWinningBids} from "/src/renderWinningBids.js";
import {debounce} from "./src/debounce.js";
import {initAdserver} from "./src/initAdserver.js";

initQueue();
window.googletag = window.googletag || { cmd: [] }

const googleQue = [...googletag.cmd]
googletag.cmd.length = 0

googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
});

const adUnitsCache = [];

function runAuction() {
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

const runAuctionDebounced = debounce(runAuction, 10);

const run = (adUnitPath, sizes) => {
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


const placements = {};
googletag.cmd.push(() => {
    const defineSlot_old = googletag.defineSlot;
    googletag.defineSlot = function (adUnitPath, sizes, div) {
        placements[div] = { adUnitPath, sizes, auctionInProgressPromise: run(div, sizes) };

        return defineSlot_old.call(googletag, adUnitPath, sizes, div);
    };
});

if (CONFIG.ad_refresh) {
    googletag.cmd.push(() => {
        googletag.display = function (div) {
            const slots = googletag.pubads().getSlots();
            const div_slot = slots.find(slot => slot.getSlotElementId() === div);
            const slot_sizes = div_slot.getSizes().map(size => {
                return [size.width, size.height];
            });
            setInterval(() => {
                run(div_slot.getSlotElementId(), slot_sizes)
                    .then(() => {
                        renderWinningBids();
                    });
            }, CONFIG.refreshTimeSeconds * 1000);
            placements[div].auctionInProgressPromise.then(() => {
                googletag.pubads().refresh([div_slot]);
            });
        };
    });
} else {
    googletag.cmd.push(() => {
        googletag.display = function (div) {
            const slots = googletag.pubads().getSlots();
            const div_slot = slots.find(slot => slot.getSlotElementId() === div);
            placements[div].auctionInProgressPromise.then(() => {
                googletag.pubads().refresh([div_slot]);
            });
        };
    });
}

googletag.cmd.push(...googleQue);



window.wrapper = window.wrapper || {};
wrapper.cmd = wrapper.cmd || [];
window.wrapper.processQueue();
