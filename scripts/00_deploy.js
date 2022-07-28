const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const MaxiCoin = await hre.ethers.getContractFactory("MaxiCoin");
  const maxiCoin = await MaxiCoin.deploy();
  await maxiCoin.deployed();
  console.log("maxiCoin deployed to:", maxiCoin.address);

  const MaxiNFT = await hre.ethers.getContractFactory("MaxiNFT");
  const nft = await MaxiNFT.deploy(maxiCoin.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);

  fs.writeFileSync('./config.js', `export const maxiCoinAddress = "${maxiCoin.address}" \nexport const nftAddress = "${nft.address}" \nexport const maxAddress="0xd472e7FE0CEBb1F4085071dF239e51129CF4A39c"`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
