"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useAccount } from '@/contexts/AccountContext';

const blockchainIcons = {
  ethereum: '/ethereum.webp',
  solana: '/Solana.png',
  polygon: '/ethereum.webp', // You can add a polygon icon
  bsc: '/ethereum.webp', // You can add a BSC icon
};

const blockchainColors = {
  ethereum: 'from-blue-400 to-blue-600',
  solana: 'from-purple-400 to-purple-600',
  polygon: 'from-indigo-400 to-indigo-600',
  bsc: 'from-yellow-400 to-yellow-600',
};

export function AccountManager() {
  const { accounts, activeAccount, switchAccount, deleteAccount } = useAccount();
  const [showAccountList, setShowAccountList] = useState(false);

  const handleDeleteAccount = (accountId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
      deleteAccount(accountId);
    }
  };

  if (!activeAccount) return null;

  return (
    <div className="relative">
      {/* Active Account Display */}
      <div 
        className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setShowAccountList(!showAccountList)}
      >
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${blockchainColors[activeAccount.blockchain]} flex items-center justify-center text-white font-semibold shadow-md`}>
          <Image 
            src={blockchainIcons[activeAccount.blockchain]} 
            alt={activeAccount.blockchain} 
            width={20} 
            height={20} 
            className="rounded-full" 
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-700">{activeAccount.name}</p>
          <p className="text-xs text-slate-500 capitalize">{activeAccount.blockchain} Wallet</p>
        </div>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform ${showAccountList ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Account Dropdown */}
      {showAccountList && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
          <div className="p-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">All Accounts</h3>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors ${
                  account.isActive ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div 
                  className="flex-1 flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    switchAccount(account.id);
                    setShowAccountList(false);
                  }}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${blockchainColors[account.blockchain]} flex items-center justify-center shadow-sm`}>
                    <Image 
                      src={blockchainIcons[account.blockchain]} 
                      alt={account.blockchain} 
                      width={16} 
                      height={16} 
                      className="rounded-full" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{account.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{account.blockchain}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">${account.balance.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">
                      {account.address.slice(0, 6)}...{account.address.slice(-4)}
                    </p>
                  </div>
                </div>
                {!account.isActive && accounts.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteAccount(account.id, e)}
                    className="p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700 transition-colors"
                    title="Delete account"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
