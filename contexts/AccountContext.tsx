"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

export interface Account {
  id: string;
  name: string;
  blockchain: 'solana' | 'ethereum';
  address: string;
  privateKey: string;
  derivationPath: string;
  balance: number;
  isActive: boolean;
  createdAt: Date;
}

export interface WalletState {
  mnemonic: string | null;
  accounts: Account[];
  isInitialized: boolean;
}

interface AccountContextType {
  wallet: WalletState;
  accounts: Account[];
  activeAccount: Account | null;
  initializeWallet: (mnemonic?: string) => void;
  createAccount: (name: string, blockchain: Account['blockchain']) => Promise<Account>;
  switchAccount: (accountId: string) => void;
  deleteAccount: (accountId: string) => void;
  updateAccountName: (accountId: string, newName: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Generate wallet from mnemonic and derivation path
const generateWalletFromMnemonic = (blockchain: Account['blockchain'], mnemonic: string, accountIndex: number = 0): Omit<Account, 'id' | 'name' | 'balance' | 'isActive' | 'createdAt'> => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  if (blockchain === 'solana') {
    // Solana derivation path: m/44'/501'/accountIndex'/0'
    const derivationPath = `m/44'/501'/${accountIndex}'/0'`;
    const derivedSeed = derivePath(derivationPath, seed.toString('hex')).key;
    const keypair = Keypair.fromSeed(derivedSeed);
    
    return {
      blockchain,
      address: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
      derivationPath,
    };
  } else {
    // Ethereum derivation path: m/44'/60'/0'/0/accountIndex
    const derivationPath = `m/44'/60'/0'/0/${accountIndex}`;
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);
    const wallet = hdNode.derivePath(derivationPath);
    
    return {
      blockchain,
      address: wallet.address,
      privateKey: wallet.privateKey,
      derivationPath,
    };
  }
};

export function AccountProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    mnemonic: null,
    accounts: [],
    isInitialized: false,
  });

  const activeAccount = wallet.accounts.find(account => account.isActive) || null;

  const initializeWallet = (providedMnemonic?: string) => {
    const mnemonic = providedMnemonic || bip39.generateMnemonic();
    setWallet({
      mnemonic,
      accounts: [],
      isInitialized: true,
    });
  };

  const createAccount = async (name: string, blockchain: Account['blockchain']): Promise<Account> => {
    if (!wallet.mnemonic) {
      throw new Error('Wallet not initialized');
    }

    // Calculate account index for this blockchain
    const existingAccountsOfType = wallet.accounts.filter(acc => acc.blockchain === blockchain);
    const accountIndex = existingAccountsOfType.length;
    
    // Generate wallet data from mnemonic
    const walletData = generateWalletFromMnemonic(blockchain, wallet.mnemonic, accountIndex);
    
    const newAccount: Account = {
      id: Date.now().toString(),
      name,
      ...walletData,
      balance: 0,
      isActive: wallet.accounts.length === 0, // First account is active
      createdAt: new Date(),
    };

    setWallet(prev => ({
      ...prev,
      accounts: [...prev.accounts, newAccount]
    }));
    
    return newAccount;
  };

  const switchAccount = (accountId: string) => {
    setWallet(prev => ({
      ...prev,
      accounts: prev.accounts.map(account => ({
        ...account,
        isActive: account.id === accountId,
      }))
    }));
  };

  const deleteAccount = (accountId: string) => {
    setWallet(prev => {
      const filteredAccounts = prev.accounts.filter(account => account.id !== accountId);
      const deletedAccountWasActive = prev.accounts.find(account => account.id === accountId)?.isActive;
      
      // If deleted account was active, make the first remaining account active
      if (deletedAccountWasActive && filteredAccounts.length > 0) {
        filteredAccounts[0].isActive = true;
      }
      
      return {
        ...prev,
        accounts: filteredAccounts
      };
    });
  };

  const updateAccountName = (accountId: string, newName: string) => {
    setWallet(prev => ({
      ...prev,
      accounts: prev.accounts.map(account =>
        account.id === accountId ? { ...account, name: newName } : account
      )
    }));
  };

  return (
    <AccountContext.Provider value={{
      wallet,
      accounts: wallet.accounts,
      activeAccount,
      initializeWallet,
      createAccount,
      switchAccount,
      deleteAccount,
      updateAccountName,
    }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
