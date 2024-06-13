export const adUnitsF = (code, div_sizes) => {
  return [
    {
      code: code,
      mediaTypes: {
        banner: {
          sizes: div_sizes,
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
  ];
};
