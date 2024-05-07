const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'fitness crystal prize love great slide clay trim balance again resemble clerk'; // mnemonic

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    sepolia: {
      provider: () => new HDWalletProvider(
        mnemonic, 
        'https://sepolia.infura.io/v3/e4cd38c1d6744fc3a7a2aced6e20aab5'
      ),
      network_id: 11155111,   // Sepolia's network id
      gas: 8000000,           
      gasPrice: 1000000000,  
      confirmations: 2,       
      timeoutBlocks: 200,     
      skipDryRun: true     
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",      // Fetch exact version from solc-bin
      settings: {             // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 500
       },
      }
    }
  },
  db: {
    enabled: false
  }
};
