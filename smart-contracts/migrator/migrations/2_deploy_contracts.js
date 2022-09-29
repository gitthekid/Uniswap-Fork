const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");

module.exports = async function (deployer) {
  await deployer.deploy(BonusToken);
  const bonusToken = await BonusToken.deployed();

  const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const pairAddress = "0x3356c9a8f40f8e9c1d192a4347a76d18243fabc5";
  const routerForkAddress = "0xA01D190039A27Fe23d095f99Fe98CB223A256a06";
  const pairForkAddress = "0xd969B2FAb31aFeD688364Cf28ceE32eB01f11BD4";

  await deployer.deploy(
    LiquidityMigrator,
    routerAddress,
    pairAddress,
    routerForkAddress,
    pairForkAddress,
    bonusToken.address
  );
  const liquidityMigrator = await LiquidityMigrator.deployed();
  await bonusToken.setLiquidator(liquidityMigrator.address);
};
