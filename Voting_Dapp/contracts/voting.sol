// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    mapping(address => bool) public hasVoted;  // Track if an account has voted
    address public owner;
    bool public votingActive;  // State variable to track if voting is active

    event CandidateAdded(uint id, string name, uint voteCount);
    event VoteCasted(uint candidateId, address voter);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    modifier whenVotingActive() {
        require(votingActive, "Voting is not active");
        _;
    }

    constructor() {
        owner = msg.sender;  // Set the contract deployer as the owner
        votingActive = true;  // Initially set voting as active
    }

    function addCandidate(string memory name) public onlyOwner {
        candidatesCount += 1;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);
        emit CandidateAdded(candidatesCount, name, 0);
    }

    function initializeCandidates() public onlyOwner {
        addCandidate("Zara Hotak");
        addCandidate("Shahid Khan");
        addCandidate("Sara Aron");
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }
        return allCandidates;
    }

    function enableVoting() public onlyOwner {
        votingActive = true;
    }

    function disableVoting() public onlyOwner {
        votingActive = false;
    }

    function vote(uint candidateId) public whenVotingActive {
        require(candidateId > 0 && candidateId <= candidatesCount, "Invalid candidate ID: Out of range");
        require(!hasVoted[msg.sender], "You have already voted.");  // Check if the voter has already voted
        candidates[candidateId].voteCount += 1;
        hasVoted[msg.sender] = true;  // Mark this account as having voted
        emit VoteCasted(candidateId, msg.sender);
    }
}
