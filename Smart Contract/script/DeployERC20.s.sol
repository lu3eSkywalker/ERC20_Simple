// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {ERC20} from "../src/ERC20.sol";

contract DeployFundMe is Script{
    function run() external returns(ERC20) {
        // Define initial supply, token name, and symbol
        uint256 initialSupply = 10000;
        string memory tokenName = "Baby-Yoda-Coin";
        string memory tokenSymbol = "Yoda";
        
        vm.startBroadcast();
        
        // Deploy the ERC20 token with required constructor arguments
        ERC20 erc20 = new ERC20(initialSupply, tokenName, tokenSymbol);
        
        vm.stopBroadcast();
        
        return erc20;
    }
}