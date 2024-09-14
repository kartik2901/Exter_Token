// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/* @title Exter Token Contract
 * @dev This contract implements the Exter token, an ERC20-compliant token
 * that includes ownership control through the Ownable contract.
 */

contract Exter is ERC20, Ownable {

 /**
 * @dev Constructor to initialize the token with a name, symbol, and initial supply.
 * The token is minted to the deployer's address.
 */

    constructor() ERC20("Exter", "AURICS") Ownable(msg.sender) {
        _mint(msg.sender, 10**10 *  10** decimals());
    }


error sizeMismatch(uint256 expected , uint256 actual);
   
/**
 * Airdrops tokens to a list of addresses.
 *
 * @param addresses The list of addresses to airdrop tokens to.
 * @param amounts The amount of tokens to airdrop to each address.
 *
 * Requirements:
 * - The caller must be the owner of the contract.
 * - The length of the `addresses` and `amounts` arrays must match.
 * - None of the addresses in the `addresses` array can be the zero address.
 */   


function AirdropTokens(address[] memory addresses, uint256[] memory amounts) external onlyOwner{
   
    if(addresses.length != amounts.length) {
        revert sizeMismatch(addresses.length, amounts.length);
    }

    uint256 totalLength = addresses.length ; 

    for (uint256 i = 0; i < totalLength; i++) {

        // require(addresses[i] !=  address(0), "Error :  Address Zero");
        _transfer(msg.sender, addresses[i], amounts[i]);
        
    }
}

  
}