import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { School } from '../types';

const MotionDiv = motion.div as any;

interface PasswordModalProps {
  isOpen: boolean;
  school: School | null;
  onClose: () => void;
  onSuccess: (url: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, school, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShake, setIsShake] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setIsShake(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!school) return;

    if (password === school.password) {
      onSuccess(school.url);
      onClose();
    } else {
      setError('Incorrect password');
      setIsShake(true);
      // Remove shake class after animation triggers
      setTimeout(() => setIsShake(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && school && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-md bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl ${
              isShake ? 'animate-[shake_0.5s_ease-in-out]' : ''
            }`}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-400">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Restricted Access</h3>
                  <p className="text-sm text-gray-400">Enter password for {school.name}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter school password..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
                </div>
                
                {error && (
                  <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm mt-2"
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </MotionDiv>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all duration-200"
              >
                <span>Access Drive</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;