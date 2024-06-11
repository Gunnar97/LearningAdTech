export const getData = () => {
    const timeFormatted = (currentTime)=> currentTime.getHours().toString().padStart(2, '0') + ':' +
        currentTime.getMinutes().toString().padStart(2, '0') + ':' +
        currentTime.getSeconds().toString().padStart(2, '0');

    return new Promise((resolve, reject) => {
        const eventData = [];

        pbjs.onEvent('auctionInit', function(data) {
            eventData.push({
                timeS: timeFormatted(new Date()),
                placement: data.adUnits.map(unit => unit.code).toString(),
                type: 'auctionStarted',
                description: 'Auction has started',
                arguments: data.auctionId,
            });
            // resolve(eventData);
        });
        pbjs.onEvent('auctionEnd', function(data) {
            eventData.push({
                timeS: timeFormatted(new Date()),
                placement: data.adUnits.map(unit => unit.code).toString(),
                type: 'auctionEnded',
                description: 'Auction has ended',
                arguments: data.auctionId,
            });
            // resolve(eventData);
        });
        pbjs.onEvent('bidWon', function(data) {
            eventData.push({
                timeS: timeFormatted(new Date()),
                placement: data.adUnitCode,
                type: 'bidWon',
                description: 'Bid has been won for ad unit ' + data.adUnitCode,
                arguments: data.transactionId,
            });
            resolve(eventData);
        });


    });
}