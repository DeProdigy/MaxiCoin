// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MaxiCoin is ERC20, Ownable {
    event Minted(address indexed _account, uint256 _amount);

    constructor() ERC20("MaxiCoin", "MXCOIN") {}

    function mintToAccount(address _account, uint256 _amount) public onlyOwner {
        _mint(_account, _amount);
        emit Minted(_account, _amount);
    }
}
