import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { _createIframe } from "../src/createIframe.js";

describe('_createIframe', () => {
    let document;

    beforeEach(() => {
        const dom = new JSDOM();
        document = dom.window.document;
        global.document = document;
    });

    it('should create an iframe with the correct width and height', () => {
        const width = 300;
        const height = 150;
        const iframe = _createIframe(width, height);

        expect(iframe.tagName).toBe('IFRAME');
        expect(iframe.width).toBe(`${width}px`);
        expect(iframe.height).toBe(`${height}px`);
    });

    it('should set scrolling to no', () => {
        const iframe = _createIframe(300, 150);
        expect(iframe.scrolling).toBe('no');
    });
});
