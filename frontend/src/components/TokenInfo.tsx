import React, { useState } from 'react';
import { ethers } from 'ethers';


const TokenInfo = () => {

    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');
    const [tokenSupply, setTokenSupply] = useState<string>('');


    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
        "function getTokenInfo() public view returns(string memory, string memory, uint256, uint256)"
    ]

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    async function tokenInfo() {
        const tokenInfo = await contract.getTokenInfo();
        // console.log(tokenInfo.toString());
        const fullTokenInfo = tokenInfo.toString();
        const name = fullTokenInfo.split(',')[0];
        setTokenName(name);

        const symbol = fullTokenInfo.split(',')[1];
        setTokenSymbol(symbol);

        const totalSupply = fullTokenInfo.split(',')[2];
        setTokenSupply(totalSupply);

    }

  return (
    <div>
        <button onClick={() => tokenInfo()}>Token Info</button>
        <br></br>
        <br></br>

        <p>Name: {tokenName}</p>
        <br />
        <p>Symbol: {tokenSymbol}</p>
        <br />
        <p>Supply: {tokenSupply}</p>
    </div>
  )
}

export default TokenInfo