import { adUnitsF } from "./adUnits";
import { PREBID_TIMEOUT } from "./constant";

// wrapper
window.wrapper = window.wrapper || {}
wrapper.SRA = wrapper.SRA || false

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

googletag.cmd.push(() => {
    const defineSlot_old = googletag.defineSlot
    googletag.defineSlot = function(adUnitPath, sizes, div) {
        pbjs.que.push(() => {
            adUnitsCache.push(adUnitsF(adUnitPath, sizes))
            if (wrapper.SRA) {
                runAuctionDebounced();
            } else {
                runAuction();
            }
        });
        return defineSlot_old.call(googletag, adUnitPath, sizes, div)
    } 
})

googletag.cmd.push(...googleQue)

const gpt_script = document.createElement('script')
gpt_script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js"
gpt_script.async = true

document.head.appendChild(gpt_script)