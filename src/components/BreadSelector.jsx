import React from 'react';

const translations = {
  en: {
    title: "Choose Your Bread",
    description: "Select the perfect bread for your sandwich",
    breads: {
      baguette: "Baguette",
      ciabatta: "Ciabatta"
    }
  },
  he: {
    title: "בחר את הלחם שלך",
    description: "בחר את הלחם המושלם לכריך שלך",
    breads: {
      baguette: "באגט",
      ciabatta: "צ'יאבטה"
    }
  }
};

const breadImages = {
  baguette: "/images/breads/baguette.jpg",
  ciabatta: "/images/breads/ciabatta.jpg"
};

function BreadSelector({ selectedBread, onSelect, language }) {
  const t = translations[language];
  const breadOptions = Object.keys(t.breads);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
      <p className="mb-6 text-gray-300">{t.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {breadOptions.map((bread) => (
          <div 
            key={bread}
            onClick={() => onSelect(bread)}
            className={`cursor-pointer bg-gray-700 rounded-lg overflow-hidden transition-all ${selectedBread === bread ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:bg-gray-600'}`}
          >
            <div className="h-48 bg-gray-700">
              <img 
                src={breadImages[bread]} 
                alt={t.breads[bread]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${selectedBread === bread ? 'border-blue-500' : 'border-gray-400'}`}>
                {selectedBread === bread && (
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                )}
              </div>
              <h3 className="text-xl font-medium">{t.breads[bread]}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreadSelector;