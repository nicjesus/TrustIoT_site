import React from "react";
import { motion } from "framer-motion";
import { Shield, Network, Cpu, Github } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white font-inter">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-[#00FFB2]">TrustIoT</h1>
        <div className="space-x-6">
          <a href="#about" className="hover:text-[#00FFB2]">Sobre</a>
          <a href="#how" className="hover:text-[#00FFB2]">Como Funciona</a>
          <a href="#demo" className="hover:text-[#00FFB2]">Demo</a>
          <a href="#team" className="hover:text-[#00FFB2]">Equipe</a>
          <a href="#contact" className="hover:text-[#00FFB2]">Contato</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-28 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Segurança e Integridade para o Futuro da IoT
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Uma aplicação descentralizada que garante a autenticidade dos dados de sensores usando Blockchain e a CESS Network.
        </p>
        <a href="#demo">
          <button className="mt-10 bg-[#00FFB2] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#00d99b] transition-all">
            Ver em Ação
          </button>
        </a>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#00FFB2]">Sobre o Projeto</h3>
          <p className="text-gray-300 leading-relaxed">
            O TrustIoT é uma solução inovadora que utiliza Blockchain e armazenamento descentralizado para garantir a integridade dos dados de sensores de Internet das Coisas (IoT). O projeto integra segurança, transparência e resiliência em uma arquitetura confiável.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6">
        <h3 className="text-center text-3xl font-bold mb-12 text-[#00FFB2]">Como Funciona</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg text-center">
            <Cpu size={48} className="mx-auto text-[#00FFB2] mb-4" />
            <h4 className="font-semibold text-xl mb-2">Coleta IoT</h4>
            <p className="text-gray-400">Sensores reais ou simulados enviam dados ao gateway TrustIoT.</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg text-center">
            <Network size={48} className="mx-auto text-[#00FFB2] mb-4" />
            <h4 className="font-semibold text-xl mb-2">CESS Network</h4>
            <p className="text-gray-400">Os dados são armazenados de forma descentralizada e segura.</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg text-center">
            <Shield size={48} className="mx-auto text-[#00FFB2] mb-4" />
            <h4 className="font-semibold text-xl mb-2">Blockchain Proof</h4>
            <p className="text-gray-400">O hash dos dados é registrado em smart contract para prova de existência.</p>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-24 px-6 bg-[#0f172a] text-center">
        <h3 className="text-3xl font-bold mb-10 text-[#00FFB2]">Demonstração</h3>
        <p className="text-gray-400 mb-6">(Em breve: painel ao vivo com dados de sensores e blockchain)</p>
        <div className="border border-gray-700 rounded-xl p-10 max-w-3xl mx-auto">
          <p className="text-gray-500">Dashboard IoT - Placeholder</p>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6">
        <h3 className="text-center text-3xl font-bold mb-10 text-[#00FFB2]">Equipe</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-center">
          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h4 className="text-xl font-semibold">Nicolas Carregosa de Jesus</h4>
            <p className="text-gray-400">Engenharia de Redes - Universidade de Brasília</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h4 className="text-xl font-semibold">Profa. Cláudia Jacy Barenco Abbas</h4>
            <p className="text-gray-400">Orientadora - Projetos Transversais I</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#020617] py-10 text-center border-t border-gray-800">
        <p className="text-gray-400 mb-4">
          Entre em contato: <a href="mailto:nicolas@unb.br" className="text-[#00FFB2]">nicolas@unb.br</a>
        </p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com" className="hover:text-[#00FFB2]" target="_blank" rel="noreferrer">
            <Github />
          </a>
        </div>
        <p className="text-gray-600 mt-6 text-sm">© 2025 TrustIoT - Projeto Transversal UnB</p>
      </footer>
    </div>
  );
}

