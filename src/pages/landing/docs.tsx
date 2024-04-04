import React from "react";

export default function Docs() {
  return (
    <main className="w-full px-24 py-2">
      <body className="flex flex-row gap-x-7 justify-between">
        <div className="bg-white shadow-lg rounded-xl p-5 w-[140%]">
          <p className="text-xl font-satoshi-medium">Peg Stability</p>
          <p className="mt-7">
            $QUOTE is backed by 400% ETH and managed by virtual delta-neutral
            positions on Ethereum, which ensures it stays stable and maintains a
            value of 1 $QUOTE to $1.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-5 w-[80%]">
          <p className="text-xl font-satoshi-medium">Peg Stability</p>
          <p className="mt-7">
            $QUOTE is backed by 400% ETH and managed by virtual delta-neutral
            positions on Ethereum, which ensures it stays stable and maintains a
            value of 1 $QUOTE to $1.
          </p>
        </div>
      </body>
    </main>
  );
}
