import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
//  unused configuration commented out for now
//  mumbai: {
//    url: "https://rpc-mumbai.maticvigil.com",
//    accounts: [process.env.privateKey]
//  }
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

export default config;


// /* hardhat.config.js */
// require("@nomiclabs/hardhat-waffle")

// module.exports = {
//   defaultNetwork: "hardhat",
//   networks: {
//     hardhat: {
//       chainId: 1337
//     },
// //  unused configuration commented out for now
// //  mumbai: {
// //    url: "https://rpc-mumbai.maticvigil.com",
// //    accounts: [process.env.privateKey]
// //  }
//   },
//   solidity: {
//     version: "0.8.4",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   }
// }
