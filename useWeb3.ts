import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

interface UseWeb3Params {
    contractABI: AbiItem[];
    contractAddress: string;
}

const useWeb3 = ({ contractABI, contractAddress }: UseWeb3Params) => {
    const [web3, setWeb3] = useState<Web3>();
    const [contract, setContract] = useState<any>();
    const [accounts, setAccounts] = useState<string[]>([]);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    const accounts = await web3Instance.eth.getAccounts();
                    const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                    setWeb3(web3Instance);
                    setContract(contractInstance);
                    setAccounts(accounts);
                } catch (error) {
                    console.error('Error initializing web3:', error);
                }
            } else {
                console.error("Ethereum wallet is not connected");
            }
        };

        initWeb3();
    }, [contractABI, contractAddress]);

    return { web3, contract, accounts };
};

export default useWeb3;
