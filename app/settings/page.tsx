"use client";

import { useState } from "react";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export default function SettingsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    mnemonic: false,
    private: false,
    address: false
  });

  const [walletController] = useState(() => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const path = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privateKey = bs58.encode(secret);
    return {
      mnemonic,
      publicKey,
      privateKey
    };
  });

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
      console.error("Failed to copy: ", err);
    }
  };

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
          {/* Mnemonic Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-blue-100/30 transition-all duration-200"
              onClick={() => toggleSection('mnemonic')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Recovery Phrase</h2>
                  <p className="text-sm text-slate-600">Your 12-word backup phrase</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {expandedSections.mnemonic && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(walletController.mnemonic, "mnemonic");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md font-medium"
                  >
                    {copied === "mnemonic" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Phrase
                      </>
                    )}
                  </button>
                )}
                <svg
                  className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${expandedSections.mnemonic ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {expandedSections.mnemonic && (
              <div className="px-6 pb-6">
                <div className="bg-white rounded-xl p-6 border border-blue-200/40 shadow-inner">
                  <p className="text-sm text-slate-700 mb-4 font-medium">
                    ⚠️ Keep this phrase safe and never share it with anyone:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {walletController.mnemonic.split(' ').map((word, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                        <span className="text-xs text-slate-500 font-medium">{index + 1}</span>
                        <p className="font-mono font-semibold text-slate-800">{word}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Private Key Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-amber-100/30 transition-all duration-200"
              onClick={() => toggleSection('private')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243A6 6 0 0121 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Private Key</h2>
                  <p className="text-sm text-slate-600">Your wallet's private key</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {expandedSections.private && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(walletController.privateKey, "private");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-md font-medium"
                  >
                    {copied === "private" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Key
                      </>
                    )}
                  </button>
                )}
                <svg
                  className={`w-6 h-6 text-amber-600 transition-transform duration-300 ${expandedSections.private ? 'rotate-180' : ''}`}
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
                <div className="bg-white rounded-xl p-6 border border-amber-200/40 shadow-inner">
                  <p className="text-sm text-slate-700 mb-4 font-medium">
                    🔐 This key provides full access to your wallet:
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <code className="text-sm font-mono break-all text-slate-800 leading-relaxed">
                      {walletController.privateKey}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Public Address Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/60 rounded-2xl overflow-hidden shadow-lg">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-emerald-100/30 transition-all duration-200"
              onClick={() => toggleSection('address')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Public Address</h2>
                  <p className="text-sm text-slate-600">Share this to receive payments</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {expandedSections.address && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(walletController.publicKey, "address");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-md font-medium"
                  >
                    {copied === "address" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Address
                      </>
                    )}
                  </button>
                )}
                <svg
                  className={`w-6 h-6 text-emerald-600 transition-transform duration-300 ${expandedSections.address ? 'rotate-180' : ''}`}
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
                <div className="bg-white rounded-xl p-6 border border-emerald-200/40 shadow-inner">
                  <p className="text-sm text-slate-700 mb-4 font-medium">
                    📤 Share this address to receive payments:
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <code className="text-sm font-mono break-all text-slate-800 leading-relaxed">
                      {walletController.publicKey}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Warning */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/60 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-md flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">🔒 Security Guidelines</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Never share your recovery phrase or private key with anyone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Store your recovery phrase in a secure, offline location</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Anyone with these credentials can control your wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="font-semibold">This is a demo wallet - do not use for real funds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}