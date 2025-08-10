'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAccount } from '@/contexts/AccountContext';
import CreateAccountModal from './CreateAccountModal';

export function CreateAccountFAB() {
  const { wallet, accounts } = useAccount();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Only show FAB if wallet is initialized and has accounts
  if (!wallet.isInitialized || accounts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center z-40"
        title="Create New Account"
      >
        <Plus size={24} />
      </button>

      {/* Create Account Modal */}
      <CreateAccountModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}
