import React, { useState } from "react";
import { ethers } from "ethers";

const TransferFrom = () => {
  const [originalOwner, setOriginalOwner] = useState<string>("");
  const [addressToSend, setAddressToSend] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<number>(0);

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function transferFrom(address, address, uint256) public returns (bool success)",
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || "", provider);

  const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, wallet);

  async function transferTokens() {
    const toSend = await contract.transferFrom(
      originalOwner,
      addressToSend,
      tokenAmount
    );
    console.log(toSend.toString());
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <input
          type="text"
          placeholder="Original Owner"
          onChange={(e) => setOriginalOwner(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Address to Send"
          onChange={(e) => setAddressToSend(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />

        <input
          type="number"
          placeholder="token amount"
          onChange={(e) => setTokenAmount(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />

        <button onClick={() => transferTokens()}>Transfer Tokens</button>
      </div>
    </div>
  );
};

export default TransferFrom;
