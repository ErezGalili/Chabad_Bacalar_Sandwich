import React from 'react';
import { Globe } from 'lucide-react';

function LanguageToggle({ currentLanguage, onChange }) {
  const toggleLanguage = () => {
    onChange(currentLanguage === 'en' ? 'he' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full p-2"
      aria-label="Toggle language"
    >
      <Globe size={18} />
    </button>
  );
}

export default LanguageToggle;