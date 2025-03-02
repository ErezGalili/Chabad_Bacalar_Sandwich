import React from 'react';

const translations = {
  title: "Choose Your Sandwich",
  description: "Select from our delicious sandwich options",
  sandwiches: {
    schnitzel: "Schnitzel",
    hamburger: "Hamburger",
    kebab: "Kebab",
    falafel: "Falafel",
    sabich: "Sabich",
    omelette: "Omelette"
  }
};

const sandwichImages = {
  schnitzel: "/images/sandwiches/schnitzel.jpg",
  hamburger: "/images/sandwiches/hamburger.jpg",
  kebab: "/images/sandwiches/kebab.jpg",
  falafel: "/images/sandwiches/falafel.jpg",
  sabich: "/images/sandwiches/sabich.jpg",
  omelette: "/images/sandwiches/omelette.jpg"
};

function SandwichMenu({ selectedSandwich, onSelect }) {
  const sandwichOptions = Object.keys(translations.sandwiches);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{translations.title}</h2>
      <p className="mb-6 text-gray-300">{translations.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sandwichOptions.map((sandwich) => (
          <div 
            key={sandwich}
            onClick={() => onSelect(sandwich)}
            className={`cursor-pointer rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${selectedSandwich === sandwich ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className="relative h-48 bg-gray-700">
              <img 
                src={sandwichImages[sandwich]} 
                alt={translations.sandwiches[sandwich]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{translations.sandwiches[sandwich]}</h3>
              </div>
              {selectedSandwich === sandwich && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SandwichMenu;