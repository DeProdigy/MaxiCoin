// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "base64-sol/base64.sol";

contract MaxiNFT is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string[] public imageURLs = [
        "https://ipfs.io/ipfs/QmZqgqtsHDLTwzemYNsiNpemZbL6jE8GgycjZbXSgnACQt",
        "https://ipfs.io/ipfs/QmXy7DYR8qEJSbYnk2xkwwPeZvmGULMsXpikxqNMKLSKPm",
        "https://ipfs.io/ipfs/Qmd2MXY5XCAvctxW7AgjuJQmBGYk1BfmVLVaQtpYvz7nmP",
        "https://ipfs.io/ipfs/QmSWYGYA5zBK1ug76bCDvKBqLPcatpsUzao85moRryCmaH",
        "https://ipfs.io/ipfs/QmT8idX7JYbj8qVa8RavVnTRpamstJpVyB13xrcuNVVSdg",
        "https://ipfs.io/ipfs/QmQWeESLnY3qsuyRikzYxkNBv2RcyP3T43KDpV7zqqyruL",
        "https://ipfs.io/ipfs/QmPTs51y14podxdsehrMzmyQvfWpGTTumQAZqoF7gzvtaN",
        "https://ipfs.io/ipfs/Qme3ithLJFSdRWuFASbG6Y88xz1aLt7gBjPRtiWMHMNn1V",
        "https://ipfs.io/ipfs/QmUGvpsdWMDKyw936EC3UrPyuKjcNxAotgrkKVHzfjCE3c",
        "https://ipfs.io/ipfs/QmQ28bSbX2RgPUvB5ndkPjCgR9ASYSvyA4NRcVa14oQwvh",
        "https://ipfs.io/ipfs/QmdyktjwXRTCnQHL92ybMS2YVGbMcehjn75DpEhbFfhydn",
        "https://ipfs.io/ipfs/QmVyfrmfAfvV2BZmySJtVHmuqai4Y5rhua5XxgzyRNCZoX",
        "https://ipfs.io/ipfs/QmNjTK9QWrBKvv6D2DJjson96sy47zbgqPo15BcA1FhfZ8"
    ];

    address public coinAddress;

    constructor(address _coinAddress) ERC721("MaxiNFT", "MXNFT") {
        coinAddress = _coinAddress;
    }

    function mintItem()
        public
        nonReentrant
        returns (uint256)
    {
        address user = msg.sender;

        // only allow limited minting of NFTs - only for the images uploaded to IPFS
        require(_tokenIds.current() <= imageURLs.length, "No more tokens to mint");

        // only allow holders of MaxiCoin to mint NFTs
        require(IERC20(coinAddress).balanceOf(msg.sender) >= 1, "Not enough MaxiCoin in wallet");

        uint256 newItemId = _tokenIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, imageURI(newItemId));

        _tokenIds.increment();
        return newItemId;
    }

    function imageURI(uint itemId) private view returns (string memory) {
        string memory json = string(
            abi.encodePacked(
                '{',
                    '"description": "MaxiCoin NFTs",',
                    '"image": "Max Elbert",',
                    '"image": "', imageURLs[itemId], '"'
                '}'
            )
        );

        string memory encodedJson = Base64.encode(bytes(json));
        string memory output = string(abi.encodePacked("data:application/json;base64,", encodedJson));
        return output;
    }
}
