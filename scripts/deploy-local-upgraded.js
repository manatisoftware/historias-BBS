// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const { ethers, upgrades } = require('hardhat');
const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BBSStories = await ethers.getContractFactory("BBSStories");
  //const contract = await BBSStories.deploy();
  const contract = await upgrades.deployProxy(BBSStories, undefined, { initializer: 'initialize' });
  await contract.deployed();

  console.log("Contract address:", contract.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(contract);
}

function saveFrontendFiles(contract) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Contract: contract.address }, undefined, 2)
  );

  const ContractArtifact = artifacts.readArtifactSync("BBSStories");

  fs.writeFileSync(
    path.join(contractsDir, "contract-abi.json"),
    JSON.stringify(ContractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
