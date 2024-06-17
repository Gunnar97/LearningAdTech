// export const adUnitsF =(div_1_sizes, div_2_sizes)=> {
//     return(
//     [
//         {
//             code: 'div-1',
//             mediaTypes: {
//                 banner: {
//                     sizes: div_1_sizes
//                 }
//             },
//             bids: [{
//                 bidder: 'adtelligent',
//                 params: {
//                     aid: 350975
//                 }
//             }]
//         },
//         {
//             code: 'div-2',
//             mediaTypes:
//                 {
//                     banner: {
//                         sizes: div_2_sizes
//                     }
//                 }
//             ,
//             bids: [{
//                 bidder: 'adtelligent',
//                 params: {
//                     aid: 350975
//                 }
//             }]
//         }
//     ])
// }

export const adUnitsF = (code, sizes) => {
    return {
        code: code,
        mediaTypes: {
            banner: {
                sizes: sizes,
            },
        },
        bids: [
            {
                bidder: "adtelligent",
                params: {
                    aid: 350975,
                },
            },
        ],
    }
}
