
import { describe, it, vi, expect, beforeEach } from 'vitest';
import {renderWinningBids} from "../src/renderWinningBids.js";
import { JSDOM } from 'jsdom';

let document;

beforeEach(() => {
    const dom = new JSDOM();
    document = dom.window.document;
    global.document = document;
});

global.pbjs = {
    getHighestCpmBids: vi.fn(),
    renderAd: vi.fn(()=>{})
};


global.createIframeProcess = vi.fn().mockImplementation((width, height) => {
    const iframe = document.createElement('iframe');
    iframe.width = `${width}px`;
    iframe.height = `${height}px`;
    iframe.contentWindow = { document: document.implementation.createHTMLDocument() };
    return iframe;
});

describe('renderWinningBids', () => {
    let consoleWarnSpy;

    beforeEach(() => {

        vi.clearAllMocks();


        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('should warn if no winning bids found', () => {
        pbjs.getHighestCpmBids.mockReturnValue([]);

        renderWinningBids();

        expect(consoleWarnSpy).toHaveBeenCalledWith('No winning bids found.');
    });

    it('should warn if bid does not have adUnitCode', () => {
        pbjs.getHighestCpmBids.mockReturnValue([{ adUnitCode: '', ad: 'someAd', width: 300, height: 250 }]);

        renderWinningBids();

        expect(consoleWarnSpy).toHaveBeenCalledWith('Bid does not have an adUnitCode.');
    });

    it('should warn if ad container is not found', () => {
        pbjs.getHighestCpmBids.mockReturnValue([{ adUnitCode: 'testAdUnit', ad: 'someAd', width: 300, height: 250 }]);

        renderWinningBids();

        expect(consoleWarnSpy).toHaveBeenCalledWith('Ad container with ID testAdUnit not found.');
    });

    it('should warn if no ad content found for ad unit code', () => {
        document.body.innerHTML = '<div id="testAdUnit"></div>';
        pbjs.getHighestCpmBids.mockReturnValue([{ adUnitCode: 'testAdUnit', ad: '', width: 300, height: 250 }]);

        renderWinningBids();

        expect(consoleWarnSpy).toHaveBeenCalledWith('No ad content found for ad unit code testAdUnit.');
    });

    it('should render ad in iframe', () => {
        document.body.innerHTML = '<div id="testAdUnit"></div>';
        const bid = { adUnitCode: 'testAdUnit', ad: 'someAd', adId: 'adId', width: 300, height: 250 };
        pbjs.getHighestCpmBids.mockReturnValue([bid]);

        renderWinningBids();

        const adContainer = document.getElementById('testAdUnit');
        expect(adContainer).not.toBeNull();
        expect(adContainer.querySelector('iframe')).not.toBeNull();
        expect(pbjs.renderAd).toHaveBeenCalledWith(expect.anything(), bid.adId);
    });

    it('should append stylesheet link to iframe', () => {
        document.body.innerHTML = '<div id="testAdUnit"></div>';
        const bid = { adUnitCode: 'testAdUnit', ad: 'someAd', adId: 'adId', width: 300, height: 250 };
        pbjs.getHighestCpmBids.mockReturnValue([bid]);

        renderWinningBids();

        const iframe = document.querySelector('iframe');
        iframe.onload();

        const iframeDocument = iframe.contentWindow.document;
        const link = iframeDocument.querySelector('link[rel="stylesheet"]');
        expect(link).not.toBeNull();
        expect(link.href).toContain('/reset_style.css');
    });
});
