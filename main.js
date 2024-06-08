
import 'virtual:plugins';
import {div_1_sizes, div_2_sizes, PREBID_TIMEOUT} from "/src/constant.js";
import {adUnitsF} from "/src/adUnits.js";
import {renderWinningBids} from "/src/renderWinningBids.js";

// if(import.meta.env.VITE_ADD_RED_FRAME === '1'){
//      import('/src/debugHighlight.js')
// }
pbjs.que.push(() => {
    pbjs.addAdUnits(adUnitsF(div_1_sizes, div_2_sizes));
    pbjs.requestBids({
        bidsBackHandler: renderWinningBids,
        timeout: PREBID_TIMEOUT
    });
});


export function auctionForPlacement(elementId){

}

pbjs.processQueue();
