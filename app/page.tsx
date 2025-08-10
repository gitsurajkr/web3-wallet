'use client';

import { useState } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import CreateAccountModal from '@/components/CreateAccountModal';
import { Hero } from '@/components/Hero';

export default function Home() {
  const { wallet, accounts } = useAccount();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Show create account modal if no accounts exist
  if (!wallet.isInitialized || accounts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Web3 Wallet</h1>
            <p className="text-slate-600">
              {!wallet.isInitialized 
                ? "Let's set up your wallet by creating a secure seed phrase."
                : "Create your first account to get started."
              }
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                  {!wallet.isInitialized ? 'Initialize Your Wallet' : 'Create Your First Account'}
                </h2>
                <p className="text-slate-600 text-sm">
                  {!wallet.isInitialized 
                    ? "Create a secure seed phrase that will generate all your accounts"
                    : "Add your first blockchain account to start using the wallet"
                  }
                </p>
              </div>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                {!wallet.isInitialized ? 'Get Started' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>

        <CreateAccountModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Hero />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-slate-700 font-medium">Create New Account</span>
            </button>
          </div>
        </div>

        {/* Wallet Stats */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Wallet Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Accounts</span>
              <span className="font-semibold text-slate-800">{accounts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Ethereum Accounts</span>
              <span className="font-semibold text-slate-800">
                {accounts.filter(acc => acc.blockchain === 'ethereum').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Solana Accounts</span>
              <span className="font-semibold text-slate-800">
                {accounts.filter(acc => acc.blockchain === 'solana').length}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">No recent activity</p>
          </div>
        </div>
      </div>

      <CreateAccountModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}
