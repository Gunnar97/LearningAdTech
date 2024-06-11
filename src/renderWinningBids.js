
import {createHook} from "./processes.js";
import {_createIframe} from "./createIframe.js";

export const createIframeProcess = createHook('sync', _createIframe)



export function renderWinningBids() {
    const winningBids = pbjs.getHighestCpmBids();
    if (!winningBids || winningBids.length === 0) {
        console.warn("No winning bids found.");
        return;
    }
    winningBids.forEach((bid) => {
        const adUnitCode = bid.adUnitCode;

        if (!adUnitCode) {
            console.warn("Bid does not have an adUnitCode.");
            return;
        }

        const adContainer = document.getElementById(adUnitCode);
        if (!adContainer) {
            console.warn(`Ad container with ID ${adUnitCode} not found.`);
            return;
        }

        adContainer.innerHTML = '';
        if (!bid.ad) {
            console.warn(`No ad content found for ad unit code ${adUnitCode}.`);
            return;
        }
        const iframe = createIframeProcess(bid.width,bid.height)
        adContainer.appendChild(iframe)

        pbjs.renderAd(iframe.contentWindow.document, bid.adId);

        iframe.onload = () => {
            const iframeDocument = iframe.contentWindow.document;
            const link = iframeDocument.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '/reset_style.css';
            iframeDocument.head.appendChild(link);
        };
    });
}
