import { adUnitsF } from "./adUnits";
import { PREBID_TIMEOUT } from "./constant";

// wrapper
// window.wrapper = window.wrapper || {}
// wrapper.SRA = wrapper.SRA || false

window.googletag = window.googletag || { cmd: [] }

const googleQue = [...googletag.cmd]
googletag.cmd.length = 0

googletag.cmd.push(function() {
    googletag.pubads().disableInitialLoad();
});

// function debounce(func, wait, immediate) {
//     let timeout;
//     return function () {
//         const context = this,
//             args = arguments;
//         const later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         const callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }

// const adUnitsCache = [];

// function runAuction() {
//     const elementIds = placementsCache.slice(0);
//     placementsCache.length = 0;
//     pbjs.requestBids({
//         adUnits: adUnitsCache,
//         bidsBackHandler: renderWinningBids,
//         timeout: PREBID_TIMEOUT,
//     });
// }

function initAdserver(bids) {
    console.log(bids)
    googletag.cmd.push(function() {
        pbjs.que.push(function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}

googletag.cmd.push(() => {
    const defineSlot_old = googletag.defineSlot
    googletag.defineSlot = function(adUnitPath, sizes, div) {
        console.log("def")
        // pbjs.addAdUnits(adUnitsF(adUnitPath, sizes))
        pbjs.que.push(function() {
            pbjs.requestBids({
                adUnits: adUnitsF(adUnitPath, sizes),
                bidsBackHandler: initAdserver,
                timeout: PREBID_TIMEOUT
            });
        });

        return defineSlot_old.call(googletag, adUnitPath, sizes, div)
    } 
})


googletag.cmd.push(...googleQue)

const gpt_script = document.createElement('script')
gpt_script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js"
gpt_script.async = true

document.head.appendChild(gpt_script)