const fs = require('fs');

const authorizer = "0xcacac0c929de862EE2251d92eac1106633D7a261";
const wethAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
const bufferPeriodDuration = 0;
const pauseWindowDuration = 0;

let initial_mint = 10e12;	// For Funds Pools
let initial_mint2 = 20e5;	// For Swap1 in address2
let initial_mint3 = 100e5;	// For Swap2 in address3
const initialBalances = [initial_mint/2, initial_mint/2];
let swapFeePercentage = BigInt(0.5 * 1e16);  // fee% * 1e16 -- min/max values (0.0001% and 10% respectively)
const weight_pool = [BigInt(50e16), BigInt(50e16)];
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'; 


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log (`Account Deployer: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log (`Balance Deployer: ${balance}`);

    Weth = await ethers.getContractFactory('Weth');
    weth = await Weth.deploy();
    console.log (`weth Address: ${weth.address}`);

    const data = {
        address: weth.address,
        abi: JSON.parse(weth.interface.format('json'))
    };
    fs.writeFileSync('frontend/src/weth.json', JSON.stringify(data));

    let Vault;
    Vault = await ethers.getContractFactory('Vault');
    vault = await Vault.deploy(
        authorizer,             // authorizer {Address}
        wethAddress,            // weth address {Address}
        bufferPeriodDuration,   // pauseWindowDuration {uint256}
        pauseWindowDuration     // bufferPeriodDuration {uint256}
        );
    console.log (`\t\tVault Address: ${vault.address}`);
    //console.log (vault);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
