import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

import { hardhatBaseConfig } from '@balancer-labs/v2-common';
import { name } from './package.json';

import { task } from 'hardhat/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import overrideQueryFunctions from '@balancer-labs/v2-helpers/plugins/overrideQueryFunctions';

task(TASK_COMPILE).setAction(overrideQueryFunctions);

const INFURA_RINKEBY_URL = 'https://rinkeby.infura.io/v3/025d7ebf96134012b954d0491f384c53';
const INFURA_KOVAN_URL = 'https://kovan.infura.io/v3/025d7ebf96134012b954d0491f384c53';
const PRIVATE_KEY = '7d09515c15886e11ee191c08871a10c29b76a7ad009684a0822d6f8baa173456';

export default {
  solidity: {
    version: "0.7.3",
    //compilers: hardhatBaseConfig.compilers,
    //overrides: { ...hardhatBaseConfig.overrides(name) },
    settings: {
      optimizer: {
        enabled: true,
        runs: 866,    // Empirically found for this project
      }
    }
  },
    networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      allowUnlimitedContractSize: true,
      url: INFURA_RINKEBY_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    kovan: {
      allowUnlimitedContractSize: true,
      url: INFURA_KOVAN_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
