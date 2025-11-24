import React, { useState } from 'react';
import { School } from './types';
import { SCHOOL_DATA } from './constants';
import SchoolCard from './components/SchoolCard';
import PasswordModal from './components/PasswordModal';
import { ShieldCheck, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const App: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (school: School) => {
    setSelectedSchool(school);
  };

  const handleCloseModal = () => {
    setSelectedSchool(null);
  };

  const handleAccessSuccess = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredSchools = SCHOOL_DATA.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden text-white selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-slate-950 z-[-2]" />
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 z-[-1]" />
      
      {/* Animated Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-pink-600/10 rounded-full blur-[100px]" />

      <main className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        
        {/* Header Section */}
        <header className="text-center mb-16 space-y-6">
          <MotionDiv 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-purple-300 font-medium mb-4"
          >
            <ShieldCheck size={16} />
            <span>Secure Access Portal</span>
          </MotionDiv>
          
          <MotionH1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 tracking-tight"
          >
            School Drive Resource
          </MotionH1>
          
          <MotionP 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Access school-specific documents securely. Select your institution below and enter the provided access code to view shared folders.
          </MotionP>

          {/* Search Bar */}
          <MotionDiv 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search for your school..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all backdrop-blur-sm"
            />
          </MotionDiv>
        </header>

        {/* Grid Section */}
        {filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSchools.map((school, index) => (
              <SchoolCard 
                key={school.id} 
                school={school} 
                index={index}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            <p>No schools found matching "{searchTerm}"</p>
          </MotionDiv>
        )}

        {/* Info Footer */}
        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Educational Resources Portal. Restricted Access.</p>
        </footer>
      </main>

      {/* Password Modal */}
      <PasswordModal 
        isOpen={!!selectedSchool}
        school={selectedSchool}
        onClose={handleCloseModal}
        onSuccess={handleAccessSuccess}
      />
    </div>
  );
};

export default App;