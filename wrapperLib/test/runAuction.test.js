// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { runAuction } from '../main.js';
// import {JSDOM} from "jsdom";
//
//
// const { window } = new JSDOM();
// global.window = window;
//
// const adUnitsCache = [
//     { code: 'ad-unit-1', bids: [] },
//     { code: 'ad-unit-2', bids: [] },
// ];
//
// global.pbjs = {
//     requestBids: vi.fn(),
// };
//
// global.initAdserver = vi.fn();
//
// const PREBID_TIMEOUT = 1000;
//
// beforeEach(() => {
//     adUnitsCache.length = 2;
//     adUnitsCache[0] = { code: 'ad-unit-1', bids: [] };
//     adUnitsCache[1] = { code: 'ad-unit-2', bids: [] };
//
//     global.pbjs.requestBids.mockReset();
//     global.initAdserver.mockReset();
// });
//
// describe('runAuction', () => {
//     it('should request bids and call initAdserver', async () => {
//
//         const expectedAdUnits = [...adUnitsCache];
//         const bidsBackHandler = vi.fn((...args) => {
//             initAdserver(...args);
//         });
//
//         pbjs.requestBids.mockImplementation(({ adUnits, bidsBackHandler, timeout }) => {
//             setTimeout(() => {
//                 bidsBackHandler('bid response');
//             }, timeout / 2);
//         });
//
//         await runAuction();
//
//         expect(pbjs.requestBids).toHaveBeenCalledWith({
//             adUnits: expectedAdUnits,
//             bidsBackHandler: expect.any(Function),
//             timeout: PREBID_TIMEOUT,
//         });
//
//         expect(global.initAdserver).toHaveBeenCalledWith('bid response');
//         expect(adUnitsCache.length).toBe(0);
//     });
// });
