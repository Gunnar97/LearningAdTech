import {createHook} from "./processes.js";

export const createIframeProcess = createHook('sync', _createIframe)

function _createIframe(width,height) {
    const iframe = document.createElement('iframe');
    iframe.width = width + 'px';
    iframe.height = height + 'px';
    iframe.scrolling = 'no';


    iframe.srcdoc = `
             <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ad</title>
            <link rel="stylesheet" href="/reset_style.css">
        </head>
        <body></body>
        </html>
        `;
    return iframe
}
