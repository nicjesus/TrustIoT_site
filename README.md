# **TrustIoT — A Blockchain-Based Architecture to Ensure Data Integrity in IoT Environments**

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-black)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia%20Testnet-purple)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Hardhat](https://img.shields.io/badge/Backend-Hardhat-yellow)
![Status](https://img.shields.io/badge/Status-Under%20Development-orange)

---

<p align="center">
  <img src="https://raw.githubusercontent.com/github/explore/master/topics/blockchain/blockchain.png" width="180" />
</p>

---

## 📌 **Summary**

1. [Abstract](#-1-abstract)
2. [Introduction](#-2-introduction)
3. [System Architecture](#-3-system-architecture)
4. [Simulation-Based Methodology](#-4-simulation-based-methodology)
5. [Smart Contract Implementation](#-5-smart-contract-implementation)
6. [Validation Dashboard](#-6-validation-dashboard)
7. [Conclusion & Future Work](#-7-conclusion--future-work)

---

## **1. Abstract**

The rapid growth of the Internet of Things (IoT) has enabled efficiencies across sectors such as healthcare and logistics. However, this expansion introduces significant security challenges — mainly **data integrity**.

A compromised sensor reading may lead to incorrect decisions, system failures, or serious safety risks.

**TrustIoT** proposes an architecture where IoT data hashes are recorded on a **blockchain (Ethereum Sepolia Testnet)**, ensuring **immutability, traceability, and public auditability**. Instead of storing raw sensor data, the system registers **SHA-256 hashes** in a smart contract—an efficient and tamper-proof mechanism.

The architecture was validated using a simulated IoT environment (Python + Hardhat) and a React-based dashboard.

---

## **2. Introduction**

IoT devices collect crucial data but are often deployed in insecure environments. This makes them vulnerable to:

* Man-in-the-Middle (MITM) attacks
* Data spoofing / tampering
* Centralized database breaches

Traditional server-based security (SSL/TLS, certificates) does not guarantee **historical immutability** after the data reaches the backend.

TrustIoT addresses this by recording cryptographic representations (hashes) of the data on a public blockchain. This leverages blockchain immutability to ensure that once a device reading is registered, it cannot be altered or erased.

---

## **3. System Architecture**

TrustIoT is composed of **four modular layers**, designed for scalability and security.

---

### **Layer 1 — Data Generation (IoT Simulator)**

**Technology:** Python
**Purpose:**

* Simulates an IoT device generating sensor readings.
* Computes SHA-256 hashes for each payload.

Example payload:

```json
{ "temp": 25.5, "unit": "C" }
```

---

### **Layer 2 — Orchestration & Transaction Handling**

**Technologies:** Hardhat, web3.py / ethers.js
**Purpose:**

* Receives `deviceId` + `hashData`.
* Signs and sends a blockchain transaction using a Sepolia-funded wallet.
* Invokes the `registerDevice()` function on-chain.

---

### **Layer 3 — Trust Layer (Blockchain)**

**Technology:** Solidity + Ethereum Sepolia
**Purpose:**

* Stores each device's last registered hash and timestamp.
* Ensures immutability and auditability.

---

### **Layer 4 — Presentation & Validation (Frontend)**

**Technology:** React + ethers.js (hosted on Vercel)
**Purpose:**

* Connects directly to the Sepolia network.
* Queries the smart contract through `getRecord(deviceId)`.
* Displays the stored hash and human-readable timestamp.

---

## **System Diagram**

<p align="center">
  <img src="https://i.imgur.com/sf3jQSs.png" width="600">
</p>

*(You can replace the link with your own diagram.)*

---

## **4. Simulation-Based Methodology**

To validate the architecture before integrating physical IoT hardware, a simulation approach was used:

1. **Python script generates mock IoT data.**
2. **SHA-256 hash is computed.**
3. **Hardhat orchestration layer sends the hash to the smart contract.**
4. **React dashboard retrieves the hash and timestamp from the blockchain.**

This flow proves the architecture is functionally sound and blockchain integration works end-to-end.

---

## **5. Smart Contract Implementation**

Smart contract: `TrustIoT.sol`
Language: **Solidity 0.8.20**
Network: **Sepolia Testnet**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TrustIoT {

    struct DeviceRecord {
        string deviceId;
        string hashData;
        uint256 timestamp;
    }

    mapping(string => DeviceRecord) public records;

    event DeviceRegistered(
        string deviceId,
        string hashData,
        uint256 timestamp
    );

    function registerDevice(
        string memory deviceId,
        string memory hashData
    ) public {
        records[deviceId] = DeviceRecord(
            deviceId,
            hashData,
            block.timestamp
        );

        emit DeviceRegistered(deviceId, hashData, block.timestamp);
    }

    function getRecord(string memory deviceId)
        public
        view
        returns (DeviceRecord memory)
    {
        return records[deviceId];
    }
}
```

### **Design Decisions**

✔ Minimal gas cost
✔ Direct mapping for quick lookup
✔ Event emission for real-time listeners
✔ Immutable timestamp stored from Ethereum block metadata

---

## **6. Validation Dashboard**

<p align="center">
  <img src="https://i.imgur.com/xl6Q6Te.png" width="750">
</p>

*(Replace this screenshot with your real dashboard.)*

The dashboard provides:

* RPC connection (ethers.js)
* Real-time blockchain queries
* Input field for deviceId
* Display of hash and timestamp
* Verification of end-to-end integrity

This interface completes the TrustIoT Proof of Concept (PoC).

---

## **7. Conclusion & Future Work**

TrustIoT demonstrates that it is feasible to use blockchain to ensure IoT data integrity in a verifiable and transparent way.

### **Planned Next Steps**

1. **Hardware Integration**
   ESP32 / Raspberry Pi sending real sensor data.

2. **Embedded Orchestration Layer**
   On-device signing + transaction submission.

3. **Gas Cost Analysis**
   Evaluate Mainnet vs Layer-2 networks (Polygon, Arbitrum, Optimism).

4. **Academic / Industry Partnerships**
   Collaborations for pilot deployments in real IoT environments.

---

## ⭐ **Contribute**

Pull requests and suggestions are welcome!
Feel free to open issues or extend the architecture.

---

## 📝 **License**

This project is licensed under the **MIT License**.
