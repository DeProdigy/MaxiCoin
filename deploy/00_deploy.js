module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  console.log('deploy: ', deploy);
  console.log('deployer: ', deployer);

  const maxiCoin = await deploy('MaxiCoin', {
    from: deployer,
    log: true,
    args: [],
  });

  const maxiNFT = await deploy('MaxiNFT', {
    from: deployer,
    log: true,
    args: [maxiCoin.address],
  });
};

module.exports.tags = ['all'];
