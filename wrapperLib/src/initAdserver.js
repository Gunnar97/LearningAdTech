export function initAdserver() {
    googletag.cmd.push(function () {
        pbjs.setTargetingForGPTAsync();
    });
}