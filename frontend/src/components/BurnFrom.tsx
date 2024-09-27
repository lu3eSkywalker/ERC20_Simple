import React, { useState } from "react";
import { ethers } from "ethers";

const BurnFrom = () => {
  const [ethAddress, setEthAddress] = useState<string>("");
  const [tokenAmt, setTokenAmt] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function burnFrom(address, uint256) public returns (bool success)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider);

  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, wallet);

  async function burnFrom() {
    const tokenAmount = ethers.parseUnits(tokenAmt, 1);
    const burnTokens = await contract.burnFrom(ethAddress, tokenAmount);
    console.log(burnTokens);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">

        <input
          type="text"
          placeholder="Eth Address"
          onChange={(e) => setEthAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Token Amt"
          onChange={(e) => setTokenAmt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="min-h-8">
          {hash && (
            <h2 className="text-lg font-semibold text-center break-words">
              {`Tx Hash: ${hash}`}
              <br />
              <br />

              <p className="font-semibold">Tokens Burnt successfully</p>
            </h2>
          )}
        </div>

        <button
          className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          onClick={() => burnFrom()}
        >
          Burn Tokens
        </button>
      </div>
    </div>
  );
};

export default BurnFrom;
