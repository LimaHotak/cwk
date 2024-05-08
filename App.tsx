import React, { useEffect, useState } from 'react';
import './App.css';
import useWeb3 from './hooks/useWeb3';
import VotingABI from './Voting.json'; 

interface Candidate {
    id: string;
    name: string;
    voteCount: string;
}

function App() {
  const contractAddress = "0xe3436bedE7303785Db28Cd142E6dB0d89d6f3eBd";
  const { contract, accounts } = useWeb3({ contractABI: VotingABI.abi, contractAddress });
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const loadCandidates = async () => {
      if (contract) {
        const count = await contract.methods.candidatesCount().call();
        const candidates: Candidate[] = [];
        for (let i = 1; i <= count; i++) {
          const candidate = await contract.methods.candidates(i).call();
          candidates.push({
            id: i.toString(),
            name: candidate.name,
            voteCount: candidate.voteCount,
          });
        }
        setCandidates(candidates);
      }
    };

    loadCandidates();
  }, [contract]);

  const vote = async (candidateId: string) => {
    if (contract && accounts && accounts.length > 0) {
      await contract.methods.vote(candidateId).send({ from: accounts[0] });
      alert('Vote cast successfully!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting Application</h1>
      </header>
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <div key={candidate.id}>
            <p>{candidate.name} - Votes: {candidate.voteCount}</p>
            <button onClick={() => vote(candidate.id)}>Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
