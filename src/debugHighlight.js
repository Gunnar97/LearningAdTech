import {createIframeProcess} from "./renderWinningBids.js";


export const modifyFrame = (next, iframe)=>{
    iframe.style.border = '2px solid red';
    next(iframe)
}

createIframeProcess.after(modifyFrame)

