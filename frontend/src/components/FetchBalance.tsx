import React, { useState } from 'react';
import { ethers } from 'ethers';

const FetchBalance = () => {

    const [address, setAddress] = useState<string>('');
    const [totalTokens, setTotalTokens] = useState<number>(0);
    const [showTokens, setShowTokens] = useState<boolean>(false);

    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
            "function balanceOf(address) view returns (uint256)"
    ]

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    async function getBalance() {
        const balance = await contract.balanceOf(address);
        const response = balance.toString();
        const tokens = response / 10;
        setTotalTokens(tokens);
        setShowTokens(true);
    }

  return (
    <div>
        Get the balance of the token

        <br />
        <br />
        <br />
        <br />

        <input
          type="text"
          placeholder="eth address"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <br />
        <br />
        {showTokens ? <p>Total number of tokens {address} owns: {totalTokens}</p> : <p></p>}

        <br />
        <br />




        <button onClick={() => getBalance()}>
            Get balance
        </button>
    </div>
  )
}

export default FetchBalance