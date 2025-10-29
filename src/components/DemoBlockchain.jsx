import React, { useState } from "react";
import { ethers } from "ethers";
import IoTGraph from "./IoTGraph";
import TransactionLog from "./TransactionLog";
import contractData from "../TrustIoT.json";
import Dashboard from "./Dashboard";

export default function DemoBlockchain() {
  const [account, setAccount] = useState(null);
  const [deviceId, setDeviceId] = useState("");
  const [hashData, setHashData] = useState("");
  const [records, setRecords] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Conecta à carteira MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask não detectada!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        alert("Nenhuma conta encontrada!");
        return;
      }

      setAccount(accounts[0]);
      alert(`✅ Conectado: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
    } catch (error) {
      console.error("Erro ao conectar MetaMask:", error);
      alert("Erro ao conectar MetaMask. Veja o console para detalhes.");
    }
  };

  // ✅ Registrar dispositivo no contrato
  const registerDevice = async () => {
    try {
      if (!window.ethereum || !account) {
        alert("Conecte sua carteira antes!");
        return;
      }
      if (!deviceId || !hashData) {
        alert("Preencha o ID e o hash dos dados!");
        return;
      }

      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractData.address, contractData.abi, signer);

      const tx = await contract.registerDevice(deviceId, hashData);
      await tx.wait();

      const timestamp = Math.floor(Date.now() / 1000);
      setTransactions((prev) => [{ deviceId, txHash: tx.hash, timestamp }, ...prev]);

      alert("✅ Dispositivo registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar dispositivo:", error);
      alert("Erro ao registrar dispositivo. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Consultar dados do contrato
  const getRecord = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask não detectada!");
        return;
      }
      if (!deviceId) {
        alert("Informe o ID do dispositivo!");
        return;
      }

      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractData.address, contractData.abi, provider);

      const record = await contract.getRecord(deviceId);
      if (record && record.deviceId) {
        setRecords((prev) => [record, ...prev]);
      } else {
        alert("Nenhum registro encontrado para este ID.");
      }
    } catch (error) {
      console.error("Erro ao buscar registro:", error);
      alert("Erro ao buscar registro. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI principal
  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-950/50 rounded-xl border border-slate-800">
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-teal-400 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-teal-300 transition"
        >
          Conectar MetaMask
        </button>
      ) : (
        <>
          <p className="text-slate-400 mb-6">Conectado: {account}</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="ID do dispositivo"
              className="p-3 rounded-md bg-slate-800 border border-slate-700 text-white flex-1"
            />
            <input
              value={hashData}
              onChange={(e) => setHashData(e.target.value)}
              placeholder="Hash dos dados"
              className="p-3 rounded-md bg-slate-800 border border-slate-700 text-white flex-1"
            />
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={registerDevice}
              disabled={loading}
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-300"
              } bg-teal-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition`}
            >
              Registrar
            </button>
            <button
              onClick={getRecord}
              disabled={loading}
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-600"
              } bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition`}
            >
              Consultar
            </button>
          </div>

          {/* Renderiza os componentes corretamente como JSX */}
          <IoTGraph data={records} />
          <TransactionLog transactions={transactions} />
          <Dashboard records={records} />
        </>
      )}
    </div>
  );
}

