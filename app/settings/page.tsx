"use client";

import { useState } from "react";
import { useAccount } from "@/contexts/AccountContext";
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

interface GeneratedWallet {
  mnemonic: string;
  solana: {
    address: string;
    privateKey: string;
  };
  ethereum: {
    address: string;
    privateKey: string;
  };
}

export default function SettingsPage() {
  const { wallet, activeAccount, accounts, updateAccountName } = useAccount();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    account: false,
    private: false,
    address: false,
    generator: false,
    mnemonic: false
  });
  const [editingAccountName, setEditingAccountName] = useState(false);
  const [newAccountName, setNewAccountName] = useState(activeAccount?.name || "");
  const [generatedWallet, setGeneratedWallet] = useState<GeneratedWallet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  const generateNewWallet = async () => {
    setIsGenerating(true);
    try {
      // Generate mnemonic phrase
      const mnemonic = bip39.generateMnemonic(128); // 12 words
      const seed = await bip39.mnemonicToSeed(mnemonic);
      
      // Generate Solana wallet
      const solanaPath = "m/44'/501'/0'/0'";
      const solanaDerivedSeed = derivePath(solanaPath, seed.toString('hex')).key;
      const solanaKeypair = nacl.sign.keyPair.fromSeed(solanaDerivedSeed);
      const solanaKeyPair = Keypair.fromSecretKey(solanaKeypair.secretKey);
      
      // Generate Ethereum wallet  
      const ethWallet = ethers.Wallet.fromPhrase(mnemonic);
      
      const wallet: GeneratedWallet = {
        mnemonic,
        solana: {
          address: solanaKeyPair.publicKey.toBase58(),
          privateKey: bs58.encode(solanaKeyPair.secretKey)
        },
        ethereum: {
          address: ethWallet.address,
          privateKey: ethWallet.privateKey
        }
      };
      
      setGeneratedWallet(wallet);
    } catch (error) {
      console.error('Error generating wallet:', error);
      alert('Failed to generate wallet. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateAccountName = () => {
    if (activeAccount && newAccountName.trim()) {
      updateAccountName(activeAccount.id, newAccountName.trim());
      setEditingAccountName(false);
    }
  };

  if (!activeAccount) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">No Active Account</h2>
          <p className="text-slate-500">Please create or select an account to view settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Wallet Security Settings
          </h1>
          <p className="text-slate-600">Manage your wallet credentials and security preferences</p>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Account Information Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-emerald-100/30 transition-all duration-200"
              onClick={() => toggleSection('account')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Account Information</h3>
                  <p className="text-sm text-slate-600">View and edit account details</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full capitalize">
                  {activeAccount.blockchain}
                </span>
                <svg 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedSections.account ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {expandedSections.account && (
              <div className="px-6 pb-6 space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200/40">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Account Name</label>
                      {editingAccountName ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newAccountName}
                            onChange={(e) => setNewAccountName(e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                          <button
                            onClick={handleUpdateAccountName}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingAccountName(false);
                              setNewAccountName(activeAccount.name);
                            }}
                            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-800 font-medium">{activeAccount.name}</span>
                          <button
                            onClick={() => setEditingAccountName(true)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Blockchain</label>
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full capitalize">
                        {activeAccount.blockchain}
                      </span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Balance</label>
                      <span className="text-slate-800 font-medium">${activeAccount.balance.toLocaleString()}</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Created</label>
                      <span className="text-slate-600">{activeAccount.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Private Key Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/60 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-purple-100/30 transition-all duration-200"
              onClick={() => toggleSection('private')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Private Key</h3>
                  <p className="text-sm text-slate-600">Your private key for this account</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  SENSITIVE
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(activeAccount.privateKey, "private");
                  }}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Copy Private Key"
                >
                  {copied === "private" ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                <svg 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedSections.private ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {expandedSections.private && (
              <div className="px-6 pb-6">
                <div className="bg-red-50/80 backdrop-blur-sm rounded-xl p-4 border border-red-200/40">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Security Warning</h4>
                      <p className="text-sm text-red-700">Never share your private key or seed phrase with anyone. Anyone with access to these can control your funds.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Wallet Seed Phrase (Recovery Phrase)</label>
                      <div className="bg-slate-900 rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {wallet.mnemonic?.split(' ').map((word, index) => (
                            <div key={index} className="text-green-400 text-xs font-mono bg-slate-800 p-2 rounded text-center">
                              {index + 1}. {word}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Derivation Path</label>
                      <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400">
                        {activeAccount.derivationPath}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        This account was derived from the wallet seed phrase using this path
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Private Key</label>
                      <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 break-all overflow-x-auto">
                        {activeAccount.privateKey}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Public Address Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-blue-100/30 transition-all duration-200"
              onClick={() => toggleSection('address')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Public Address</h3>
                  <p className="text-sm text-slate-600">Your wallet address for receiving funds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  SAFE TO SHARE
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(activeAccount.address, "address");
                  }}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Copy Address"
                >
                  {copied === "address" ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                <svg 
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedSections.address ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {expandedSections.address && (
              <div className="px-6 pb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/40">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Safe to Share</h4>
                      <p className="text-sm text-green-700">This is your public address. You can safely share this to receive funds.</p>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 break-all overflow-x-auto">
                    {activeAccount.address}
                  </div>
                </div>
              </div>
            )}
          </div>

          
          
        </div>
      </div>
  );
}