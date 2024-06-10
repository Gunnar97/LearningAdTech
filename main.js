import '/src/queue_init.js'
import 'virtual:plugins';
import {div_1_sizes, div_2_sizes, PREBID_TIMEOUT} from "/src/constant.js";
import {adUnitsF} from "/src/adUnits.js";
import {renderWinningBids} from "/src/renderWinningBids.js";

// if(import.meta.env.VITE_ADD_RED_FRAME === '1'){
//      import('/src/debugHighlight.js')
// }


export function auctionForPlacement(elementId) {
    const adContainer = document.getElementById(elementId);
    if (!adContainer) {
        console.warn(`Ad container with ID ${elementId} not found.`);
        return;
    }
const adUnits = adUnitsF(div_1_sizes, div_2_sizes)
    pbjs.que.push(() => {
        pbjs.addAdUnits(adUnits.filter(adUnit=> adUnit.code===elementId))
        pbjs.requestBids({
            bidsBackHandler: renderWinningBids,
            timeout: PREBID_TIMEOUT
        });
    });
    pbjs.processQueue();
}



window.wrapper.auctionForPlacement = auctionForPlacement;

window.wrapper.processQueue();


