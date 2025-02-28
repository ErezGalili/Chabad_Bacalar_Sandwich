import React from 'react';
import { Printer, Send } from 'lucide-react';

const translations = {
  en: {
    title: "Order Summary",
    description: "Review your sandwich order",
    sandwich: "Sandwich",
    bread: "Bread",
    toppings: "Toppings",
    noToppings: "No toppings selected",
    submit: "Submit Order",
    print: "Print Order",
    whatsapp: "Send via WhatsApp",
    sandwiches: {
      schnitzel: "Schnitzel",
      hamburger: "Hamburger",
      kebab: "Kebab",
      falafel: "Falafel",
      sabich: "Sabich",
      omelette: "Omelette"
    },
    breads: {
      baguette: "Baguette",
      ciabatta: "Ciabatta"
    },
    toppingsList: {
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
    title: "סיכום הזמנה",
    description: "סקור את הזמנת הכריך שלך",
    sandwich: "כריך",
    bread: "לחם",
    toppings: "תוספות",
    noToppings: "לא נבחרו תוספות",
    submit: "שלח הזמנה",
    print: "הדפס הזמנה",
    whatsapp: "שלח בוואטסאפ",
    sandwiches: {
      schnitzel: "שניצל",
      hamburger: "המבורגר",
      kebab: "קבב",
      falafel: "פלאפל",
      sabich: "סביח",
      omelette: "חביתה"
    },
    breads: {
      baguette: "באגט",
      ciabatta: "צ'יאבטה"
    },
    toppingsList: {
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

function OrderSummary({ order, onWhatsApp, onPrint, language }) {
  const t = translations[language];
  
  return (
    <div className="print:text-black">
      <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
      <p className="mb-6 text-gray-300 print:text-gray-600">{t.description}</p>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-6 print:bg-white print:border print:border-gray-300">
        <div className="mb-4 pb-4 border-b border-gray-600 print:border-gray-300">
          <h3 className="text-gray-400 text-sm mb-1">{t.sandwich}</h3>
          <p className="text-xl font-medium">{t.sandwiches[order.sandwich]}</p>
        </div>
        
        <div className="mb-4 pb-4 border-b border-gray-600 print:border-gray-300">
          <h3 className="text-gray-400 text-sm mb-1">{t.bread}</h3>
          <p className="text-xl font-medium">{t.breads[order.bread]}</p>
        </div>
        
        <div>
          <h3 className="text-gray-400 text-sm mb-2">{t.toppings}</h3>
          {order.toppings.length > 0 ? (
            <ul className="space-y-2">
              {order.toppings.map(topping => (
                <li key={topping} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span>{t.toppingsList[topping]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">{t.noToppings}</p>
          )}
        </div>
      </div>
      
      <div className="hidden print:block text-sm text-gray-500 mt-8 pt-8 border-t border-gray-300">
        <p>Order placed: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

export default OrderSummary;