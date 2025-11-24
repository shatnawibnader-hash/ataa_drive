import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Lock, ExternalLink } from 'lucide-react';
import { School } from '../types';

const MotionDiv = motion.div as any;

interface SchoolCardProps {
  school: School;
  onClick: (school: School) => void;
  index: number;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, onClick, index }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      <div 
        onClick={() => onClick(school)}
        className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors shadow-lg">
              <FolderOpen className="text-purple-400 group-hover:text-purple-300" size={24} />
            </div>
            <div className="p-2 bg-black/20 rounded-lg text-gray-400">
              <Lock size={16} />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-tight tracking-tight group-hover:text-purple-200 transition-colors">
            {school.name}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Click to access shared folder
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium text-blue-400 opacity-80 group-hover:opacity-100 group-hover:text-blue-300 transition-all">
          <span>Open Portal</span>
          <ExternalLink size={14} />
        </div>
      </div>
    </MotionDiv>
  );
};

export default SchoolCard;