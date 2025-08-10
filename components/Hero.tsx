
"use client";

import Image from "next/image";
import { useState } from "react";

export function Hero() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  const walletAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
  
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
          Portfolio Overview
        </h1>
        <p className="text-slate-600">Manage your digital assets securely</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Balance</p>
            <div className="flex items-center gap-2 mt-1">
              <Image src="/dollar.png" alt="USD" width={32} height={32} className="opacity-90" />
              <span className="text-4xl font-bold">$5,234.56</span>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
              <Image src="/Solana.png" alt="Solana" width={32} height={32} className="rounded-full" />
            </div>
            <p className="text-xs text-blue-100">Main Wallet</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-100">
            <Image src="/dollar.png" alt="USD" width={16} height={16} className="opacity-75" />
            <span className="text-lg">$0.00 available</span>
          </div>
          <button 
            onClick={copyAddress}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            <span className="text-sm font-mono text-blue-100">
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </span>
            {copiedAddress ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <Image src="/copy.png" alt="Copy" width={16} height={16} className="opacity-75" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: "Buy", icon: "/bank.png", color: "from-emerald-500 to-teal-600" },
          { name: "Receive", icon: "/arrow.png", color: "from-blue-500 to-indigo-600" },
          { name: "Send", icon: "/arrows.png", color: "from-purple-500 to-pink-600" },
          { name: "Swap", icon: "/swap.png", color: "from-orange-500 to-red-600" },
        ].map((action) => (
          <button
            key={action.name}
            className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200/60 hover:border-slate-300"
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
              <Image src={action.icon} alt={action.name} width={24} height={24} className="brightness-0 invert" />
            </div>
            <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              {action.name}
            </p>
          </button>
        ))}
      </div>

      {/* Assets Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Your Assets</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {[
            { name: "Solana", symbol: "SOL", amount: "12.45", value: "$2,847.32", change: "+5.24%", icon: "/Solana.png", positive: true },
            { name: "Ethereum", symbol: "ETH", amount: "0.75", value: "$2,387.24", change: "-2.18%", icon: "/ethereum.webp", positive: false },
          ].map((asset) => (
            <div key={asset.symbol} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Image src={asset.icon} alt={asset.name} width={28} height={28} className="rounded-full" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{asset.name}</p>
                  <p className="text-sm text-slate-500">{asset.amount} {asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800">{asset.value}</p>
                <p className={`text-sm font-medium ${asset.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {asset.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}





