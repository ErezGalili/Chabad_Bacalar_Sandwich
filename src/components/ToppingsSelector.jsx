import React from 'react';

const translations = {
  en: {
    title: "Add Toppings",
    description: "Customize your sandwich with delicious toppings",
    toppings: {
      hummus: "Hummus",
      tahini: "Tahini",
      hotSauce: "Hot Sauce",
      freshCabbage: "Fresh Cabbage",
      pickledCabbage: "Pickled Cabbage",
      pickles: "Pickles",
      purpleCabbage: "Purple Cabbage",
      mayonnaise: "Mayonnaise",
      frenchFries: "French Fries"
    }
  },
  he: {
    title: "הוסף תוספות",
    description: "התאם אישית את הכריך שלך עם תוספות טעימות",
    toppings: {
      hummus: "חומוס",
      tahini: "טחינה",
      hotSauce: "רוטב חריף",
      freshCabbage: "כרוב טרי",
      pickledCabbage: "כרוב כבוש",
      pickles: "חמוצים",
      purpleCabbage: "כרוב סגול",
      mayonnaise: "מיונז",
      frenchFries: "צ'יפס"
    }
  }
};

const toppingImages = {
  hummus: "/images/toppings/hummus.jpg",
  tahini: "/images/toppings/tahini.jpg",
  hotSauce: "/images/toppings/hot-sauce.jpg",
  freshCabbage: "/images/toppings/fresh-cabbage.jpg",
  pickledCabbage: "/images/toppings/pickled-cabbage.jpg",
  pickles: "/images/toppings/pickles.jpg",
  purpleCabbage: "/images/toppings/purple-cabbage.jpg",
  mayonnaise: "/images/toppings/mayonnaise.jpg",
  frenchFries: "/images/toppings/french-fries.jpg"
};

function ToppingsSelector({ selectedToppings, onSelect, language }) {
  const t = translations[language];
  const toppingOptions = Object.keys(t.toppings);

  const toggleTopping = (topping) => {
    if (selectedToppings.includes(topping)) {
      onSelect(selectedToppings.filter(item => item !== topping));
    } else {
      onSelect([...selectedToppings, topping]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
      <p className="mb-6 text-gray-300">{t.description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {toppingOptions.map((topping) => (
          <div 
            key={topping}
            onClick={() => toggleTopping(topping)}
            className={`cursor-pointer bg-gray-700 rounded-lg p-3 flex items-center transition-all ${selectedToppings.includes(topping) ? 'ring-2 ring-blue-500 bg-gray-600' : 'hover:bg-gray-600'}`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-600">
              <img 
                src={toppingImages[topping]} 
                alt={t.toppings[topping]} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">{t.toppings[topping]}</h3>
            </div>
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedToppings.includes(topping) ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
              {selectedToppings.includes(topping) && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToppingsSelector;