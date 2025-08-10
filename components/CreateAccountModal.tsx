'use client';

import { useState } from 'react';
import { useAccount } from '@/contexts/AccountContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Copy, Check, AlertTriangle } from 'lucide-react';
import * as bip39 from 'bip39';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BLOCKCHAIN_OPTIONS = [
  { id: 'ethereum', name: 'Ethereum', color: 'bg-blue-500' },
  { id: 'solana', name: 'Solana', color: 'bg-purple-500' },
] as const;

type CreateAccountStep = 'check-wallet' | 'seed-phrase' | 'form';

export default function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const { wallet, initializeWallet, createAccount } = useAccount();
  const [step, setStep] = useState<CreateAccountStep>('check-wallet');
  const [accountName, setAccountName] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState<'ethereum' | 'solana'>('ethereum');
  const [generatedMnemonic, setGeneratedMnemonic] = useState('');
  const [copied, setCopied] = useState(false);
  const [seedPhraseConfirmed, setSeedPhraseConfirmed] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const resetModal = () => {
    setStep('check-wallet');
    setAccountName('');
    setSelectedBlockchain('ethereum');
    setGeneratedMnemonic('');
    setCopied(false);
    setSeedPhraseConfirmed(false);
    setIsCreating(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleInitializeWallet = () => {
    if (!wallet.isInitialized) {
      const mnemonic = bip39.generateMnemonic();
      setGeneratedMnemonic(mnemonic);
      setStep('seed-phrase');
    } else {
      setStep('form');
    }
  };

  const handleConfirmSeedPhrase = () => {
    if (seedPhraseConfirmed) {
      initializeWallet(generatedMnemonic);
      setStep('form');
    }
  };

  const handleCopySeedPhrase = async () => {
    try {
      await navigator.clipboard.writeText(generatedMnemonic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleCreateAccount = async () => {
    if (!accountName.trim()) return;
    
    setIsCreating(true);
    try {
      await createAccount(accountName, selectedBlockchain);
      handleClose();
    } catch (error) {
      console.error('Failed to create account:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 w-full max-w-md relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">
            {step === 'check-wallet' && (wallet.isInitialized ? 'Create New Account' : 'Initialize Wallet')}
            {step === 'seed-phrase' && 'Save Your Seed Phrase'}
            {step === 'form' && 'Create New Account'}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {step === 'check-wallet' && (
            <div className="space-y-6 text-center">
              {!wallet.isInitialized ? (
                <>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Initialize Your Wallet</h3>
                      <p className="text-gray-400 text-sm">
                        You need to create a seed phrase first. This will be used to generate all your accounts.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleInitializeWallet}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create Seed Phrase
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Wallet Initialized</h3>
                      <p className="text-gray-400 text-sm">
                        Your wallet is ready. You can now create accounts for different blockchains.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setStep('form')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create Account
                  </Button>
                </>
              )}
            </div>
          )}

          {step === 'seed-phrase' && (
            <div className="space-y-6">
              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-amber-500 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-amber-500 font-medium mb-1">Important!</h3>
                    <p className="text-amber-200 text-sm">
                      This seed phrase will be used to generate all your accounts. Save it in a secure location.
                      Never share it with anyone.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Wallet Seed Phrase
                </label>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {generatedMnemonic.split(' ').map((word, index) => (
                      <div key={index} className="text-white text-sm font-mono bg-gray-900 p-2 rounded text-center">
                        {index + 1}. {word}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleCopySeedPhrase}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={seedPhraseConfirmed}
                    onChange={(e) => setSeedPhraseConfirmed(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300 text-sm">
                    I have saved my seed phrase in a secure location
                  </span>
                </label>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => setStep('check-wallet')}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmSeedPhrase}
                    disabled={!seedPhraseConfirmed}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 'form' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter account name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Blockchain
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {BLOCKCHAIN_OPTIONS.map((blockchain) => (
                    <button
                      key={blockchain.id}
                      onClick={() => setSelectedBlockchain(blockchain.id)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedBlockchain === blockchain.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${blockchain.color} mx-auto mb-2`} />
                      <span className="text-white text-sm font-medium">
                        {blockchain.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setStep('check-wallet')}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCreateAccount}
                  disabled={!accountName.trim() || isCreating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isCreating ? 'Creating...' : 'Create Account'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
