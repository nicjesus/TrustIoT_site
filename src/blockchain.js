// src/blockchain.js
import { ethers } from "ethers";

// Endereço do contrato implantado na Sepolia
const contractAddress = "0x65c7A90cbAeB49e282425efcD2899D55CfCc4302";

// ABI do contrato TrustIoT
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "deviceId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "hashData", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "DeviceRegistered",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "deviceId", "type": "string" }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "deviceId", "type": "string" },
          { "internalType": "string", "name": "hashData", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct TrustIoT.DeviceRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "name": "records",
    "outputs": [
      { "internalType": "string", "name": "deviceId", "type": "string" },
      { "internalType": "string", "name": "hashData", "type": "string" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "deviceId", "type": "string" },
      { "internalType": "string", "name": "hashData", "type": "string" }
    ],
    "name": "registerDevice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Função para conectar ao contrato via MetaMask
export const getBlockchain = async () => {
  if (!window.ethereum) {
    alert("MetaMask não detectada! Instale a extensão para continuar.");
    return null;
  }

  try {
    // Solicita permissão da conta
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Cria provider e signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Cria instância do contrato
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
  } catch (error) {
    console.error("Erro ao conectar com o contrato:", error);
    alert("Erro ao conectar com o contrato. Verifique o console.");
    return null;
  }
};
