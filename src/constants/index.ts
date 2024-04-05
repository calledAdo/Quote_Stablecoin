export const HeaderItems = [
  {
    id: 0,
    hashId: "home",
    route: "Home",
  },
  {
    id: 1,
    hashId: "works",
    route: "How It Works",
  },
  {
    id: 2,
    hashId: "docs",
    route: "Docs",
  },
  {
    id: 3,
    hashId: "faqs",
    route: "FAQs",
  },
];

export const DocsItems = [
    {
      id: 0,
      title: "Peg Stability",
      description: "$QUOTE is backed by 400% ETH and managed by virtual delta-neutral positions on Ethereum, which ensures it stays stable and maintains a value of 1 $QUOTE to $1.",
    },
    {
      id: 1,
      hashId: "Decentralized",
      route: "$QUOTE is fully algorithmic, making it fully decentralized and ensuring transparency, autonomy, and censorship resistance.",
    },
    {
      id: 2,
      hashId: "docs",
      route: "Docs",
    },
    {
      id: 3,
      hashId: "faqs",
      route: "FAQs",
    },
  ];

  export const FAQItems = [
    {
        id:0,
        question:"What is $QUOTE and how does it work?",
        answer:"$QUOTE is a decentralized algorithmic stablecoin pegged to the value of $1. It is minted by depositing ETH into the system and paying a small fee. Conversely, $QUOTE tokens can be burned to redeem the deposited ETH."
    },
    {
        id:1,
        question:"What is the role of $LETH in the $QUOTE ecosystem?",
        answer:"$LETH tokens represent the amount of liquidity a user contributed to the system. Users obtain $LETH tokens by depositing ETH into the pool and earning yields from minting fees and potential staking rewards."
    },
    {
        id:2,
        question:"How does the delta-neutral position work in maintaining stability?",
        answer:"The delta-neutral position on ETH ensures that the value of $QUOTE remains pegged to $1, regardless of market fluctuations. This is achieved by balancing virtual long and short positions on ETH, effectively managing collateral and stabilizing the $QUOTE ecosystem."
    },
    {
        id:3,
        question:"How can I mint $QUOTE tokens?",
        answer:"You can mint $QUOTE tokens by depositing ETH into the system and paying a small fee. Each $QUOTE token is backed by at least 400% ETH in the pool, providing stability and reliability to the system."
    },
    {
        id:4,
        question:" How are yields generated in the $QUOTE ecosystem?",
        answer:"Yields in the $QUOTE ecosystem are generated through minting fees and potential staking of ETH. Users who participate in minting $QUOTE tokens and staking ETH to generate $LETH tokens earn yields as a reward for their participation."
    },
  ]
