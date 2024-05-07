require('dotenv').config();
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies

const port = process.env.PORT || 3000;
const contractABI = require('C:\\cwk\\Voting_Dapp\\build\\contracts\\Voting.json'); 

// Set up a provider
const provider = new HDWalletProvider(
    process.env.MNEMONIC, 
    process.env.PROVIDER_URL
);

const web3 = new Web3(provider);
const votingContract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

// API to fetch all candidates
app.get('/candidates', async (req, res) => {
    try {
        const candidatesCount = await votingContract.methods.candidatesCount().call();
        let candidates = [];
        for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await votingContract.methods.candidates(i).call();
            candidates.push(candidate);
        }
        res.json(candidates);
    } catch (error) {
        console.error('Failed to fetch candidates:', error);
        res.status(500).send('Failed to fetch candidates');
    }
});

// API to cast a vote
app.post('/vote', async (req, res) => {
    const { candidateId, voter } = req.body;
    try {
        const receipt = await votingContract.methods.vote(candidateId).send({ from: voter });
        res.json({ message: "Vote successfully cast", receipt });
    } catch (error) {
        console.error('Failed to cast vote:', error);
        res.status(500).send('Failed to cast vote');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Voting app backend listening at http://localhost:${port}`);
});
