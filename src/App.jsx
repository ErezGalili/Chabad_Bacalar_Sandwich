import React, { useState } from 'react';
import { Menu, ShoppingCart, Printer } from 'lucide-react';
import SandwichMenu from './components/SandwichMenu';
import BreadSelector from './components/BreadSelector';
import ToppingsSelector from './components/ToppingsSelector';
import OrderSummary from './components/OrderSummary';
import LanguageToggle from './components/LanguageToggle';

// Translation data
const translations = {
  en: {
    title: "Order Your Sandwich – Choose Your Sandwich",
    steps: ["Choose Sandwich", "Select Bread", "Add Toppings", "Order Summary"],
    next: "Next",
    back: "Back",
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
    },
    notes: "Additional Notes",
    notesPlaceholder: "Add any special requests here...",
    orderInstructions: "In the notes, please write your contact details for the order.\n\nIf you don't want to send via WhatsApp, click on print and download your order details. You can send the downloaded file in any way you prefer.",
  },
  he: {
    title: "הזמן את הכריך שלך - בחר את הכריך שלך",
    steps: ["בחר כריך", "בחר לחם", "הוסף תוספות", "סיכום הזמנה"],
    next: "הבא",
    back: "חזור",
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
    },
    notes: "הערות נוספות",
    notesPlaceholder: "הוסף בקשות מיוחדות כאן...",
    orderInstructions: "בהערה רשמו את הפרטים שלכם בשביל ההזמנה.\n\nאם אתם לא רוצים לשלוח בוואטסאפ לחצו על הדפסה והורידו אליכם את פרטי ההזמנה, את הקובץ שיורד שלחו בכל דרך שאתם רוצים",
  }
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('en');
  const [order, setOrder] = useState({
    sandwich: '',
    bread: '',
    toppings: [],
  });
  const [orderNotes, setOrderNotes] = useState('');

  const t = translations[language];
  const isRTL = language === 'he';

  const handleSandwichSelect = (sandwich) => {
    setOrder({ ...order, sandwich });
  };

  const handleBreadSelect = (bread) => {
    setOrder({ ...order, bread });
  };

  const handleToppingsSelect = (toppings) => {
    setOrder({ ...order, toppings });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitOrder = () => {
    // In a real app, this would send the order to a backend
    alert('Order submitted! In a real app, this would send an email to the seller.');
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = '16467703071';
    
    const orderDetails = `
*New Sandwich Order*
🥪 *Sandwich:* ${translations[language].sandwiches[order.sandwich]}
🍞 *Bread:* ${translations[language].breads[order.bread]}
${order.toppings.length > 0 
  ? `🔸 *Toppings:*\n${order.toppings.map(topping => 
      `- ${translations[language].toppingsList[topping]}`).join('\n')}`
  : ''}
${orderNotes ? `📝 *Notes:*\n${orderNotes}` : ''}
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SandwichMenu 
          selectedSandwich={order.sandwich} 
          onSelect={handleSandwichSelect} 
          language={language}
        />;
      case 1:
        return <BreadSelector 
          selectedBread={order.bread} 
          onSelect={handleBreadSelect}
          language={language}
        />;
      case 2:
        return <ToppingsSelector 
          selectedToppings={order.toppings} 
          onSelect={handleToppingsSelect}
          language={language}
        />;
      case 3:
        return <OrderSummary 
          order={order} 
          onSubmit={handleSubmitOrder}
          onPrint={handlePrintOrder}
          language={language}
        />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center flex-1 min-w-0">
            <Menu className="flex-shrink-0 mr-2" />
            <h1 className="text-base sm:text-xl font-bold truncate">{t.title}</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageToggle 
              currentLanguage={language} 
              onChange={setLanguage} 
            />
            <div className="relative">
              <ShoppingCart size={20} />
              {order.sandwich && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {t.steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex-1 text-center ${index < currentStep ? 'text-green-400' : index === currentStep ? 'text-blue-400' : 'text-gray-500'}`}
              >
                <div className="relative">
                  <div className={`h-2 ${index === 0 ? 'hidden' : ''} absolute top-3 w-full ${index <= currentStep ? 'bg-blue-400' : 'bg-gray-700'}`} style={{ right: '50%' }}></div>
                  <div className={`h-2 ${index === t.steps.length - 1 ? 'hidden' : ''} absolute top-3 w-full ${index < currentStep ? 'bg-blue-400' : 'bg-gray-700'}`} style={{ left: '50%' }}></div>
                  <div className={`h-6 w-6 rounded-full mx-auto mb-1 flex items-center justify-center ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-700'}`}>
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                </div>
                <div>{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          {renderStep()}
          {currentStep === 3 && (
            <>
              {/* Custom Content Section */}
              <div className="mt-6 border-t border-gray-700 pt-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-gray-100 space-y-4">
                    {/* Hebrew Instructions */}
                    <div className="text-right" dir="rtl">
                      {translations.he.orderInstructions.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                    {/* English Instructions */}
                    <div className="text-left border-t border-gray-600 pt-4 mt-4" dir="ltr">
                      {translations.en.orderInstructions.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="mt-6 border-t border-gray-700 pt-6">
                <label className="block text-sm text-gray-400 mb-2">
                  {t.notes}
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full bg-gray-700 text-white rounded-lg p-3 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="3"
                />
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded ${currentStep === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {t.back}
          </button>
          
          {currentStep < 3 ? (
            <button 
              onClick={nextStep}
              disabled={(currentStep === 0 && !order.sandwich) || (currentStep === 1 && !order.bread)}
              className={`px-4 py-2 rounded ${(currentStep === 0 && !order.sandwich) || (currentStep === 1 && !order.bread) ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {t.next}
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handlePrintOrder}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 flex items-center"
              >
                <Printer className="mr-2" size={18} />
                {t.print}
              </button>
              <button 
                onClick={handleWhatsAppOrder}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="w-[18px] h-[18px] mr-2"
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                {t.whatsapp}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} Sandwich Order System
        </div>
      </footer>
    </div>
  );
}

export default App;