import { adUnitsF } from "./adUnits";
import { PREBID_TIMEOUT } from "./constant";
import config from "./config";

window.googletag = window.googletag || { cmd: [] }

const googleQue = [...googletag.cmd]
googletag.cmd.length = 0

googletag.cmd.push(function() {
    googletag.pubads().disableInitialLoad();
});

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

function initAdserver() {
    googletag.cmd.push(function() {
        pbjs.que.push(function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}

const adUnitsCache = [];

function runAuction() {
    const adUnits = [...adUnitsCache];
    adUnitsCache.length = 0;
    pbjs.requestBids({
        adUnits: adUnits,
        bidsBackHandler: initAdserver,
        timeout: PREBID_TIMEOUT,
    });
}

const runAuctionDebounced = debounce(runAuction, 10);

const run = (adUnitPath, sizes) => () => {
    adUnitsCache.push(adUnitsF(adUnitPath, sizes))
    if (config.sra) {
        runAuctionDebounced();
    } else {
        runAuction();
    }
}

googletag.cmd.push(() => {
    const defineSlot_old = googletag.defineSlot
    googletag.defineSlot = function(adUnitPath, sizes, div) {
        pbjs.que.push(run(adUnitPath, sizes))
        return defineSlot_old.call(googletag, adUnitPath, sizes, div)
    } 
})
if (config.ad_refresh) {
    googletag.cmd.push(() => {
        const display_old = googletag.display
        googletag.display = function (div) {
            const slots = googletag.pubads().getSlots()
            const div_slot = slots.find(slot => slot.getSlotElementId() === div)
            const slot_sizes = div_slot.getSizes().map(size => {
                return [size.width, size.height]
            })
            setInterval(() => {
                pbjs.que.push(run(div_slot.getAdUnitPath(), slot_sizes))
            }, config.refreshTimeSeconds * 1000)
            display_old.call(googletag, div)
        }
    })
}

googletag.cmd.push(...googleQue)

const gpt_script = document.createElement('script')
gpt_script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js"
gpt_script.async = true

document.head.appendChild(gpt_script)