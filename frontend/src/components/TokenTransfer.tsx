import React, { useState } from "react";
import { ethers } from "ethers";
import { BigNumberish } from "ethers";

const TokenTransfer = () => {
  const [toSendToAddress, setToSendToAddress] = useState<string>("");
  const [ethToSend, setEthToSend] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function transfer(address,uint256) public returns (bool success)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider);

  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, wallet);

  async function tokenTransfer() {
    const tokenAmount = ethers.parseUnits(ethToSend, 1); // If your token has different decimals, adjust the 18
    const transferToken = await contract.transfer(
      toSendToAddress,
      tokenAmount,
      {
        gasLimit: 10000000, // Set the gas limit as a number directly
      }
    );

    const receipt = await transferToken.wait();
    //   console.log("Transaction confirmed:", receipt);
    console.log("Hash: ", receipt.hash);
    setHash(receipt.hash);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Token Transfer</h1>

        <input
          type="text"
          placeholder="eth address"
          onChange={(e) => setToSendToAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />

        <input
          type="number"
          placeholder="Token amount"
          onChange={(e) => setEthToSend(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />

        <div className="min-h-8">
          {hash && (
            <h2 className="text-lg font-semibold text-center break-words">
              {`Tx Hash: ${hash}`}
              <br />
              <br />
              <p className="font-semibold">Tokens sent successfully</p>
            </h2>
          )}
        </div>

        <button
          className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          onClick={() => tokenTransfer()}
        >
          Transfer Token
        </button>
      </div>
    </div>
  );
};

export default TokenTransfer;
