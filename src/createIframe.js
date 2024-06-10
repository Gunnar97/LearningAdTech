export const _createIframe = (width,height) => {
    const iframe = document.createElement('iframe');
    iframe.width = `${width}px`;
    iframe.height = `${height}px`;
    iframe.scrolling = 'no';
    return iframe
}
