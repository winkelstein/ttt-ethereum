import { ethers } from "hardhat";

async function main() {
  const TicTacToe = await ethers.getContractFactory("TicTacToe");
  const ttt = await TicTacToe.deploy();

  await ttt.deployed();

  console.log(`TicTacToe has been deployed to ${ttt.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
