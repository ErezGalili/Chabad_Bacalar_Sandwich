import React, { useState } from 'react';
import { Menu, ShoppingCart, Printer } from 'lucide-react';
import SandwichMenu from './components/SandwichMenu';
import BreadSelector from './components/BreadSelector';
import ToppingsSelector from './components/ToppingsSelector';
import OrderSummary from './components/OrderSummary';

// Translation data
const translations = {
  title: "Order Your Sandwich – Choose Your Sandwich",
  steps: ["Choose Sandwich", "Select Bread", "Add Toppings", "Order Summary"],
  next: "Next",
  back: "Back",
  print: "Print Order",
  whatsapp: "Send via WhatsApp",
  notes: "Additional Notes",
  notesPlaceholder: "Enter your name and last 4 digits of your phone number",
  contactInstructions: "Please provide your name and the last 4 digits of your phone number in the notes section below.",
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
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [order, setOrder] = useState({
    sandwich: '',
    bread: '',
    toppings: [],
  });
  const [orderNotes, setOrderNotes] = useState('');

  const handleSandwichSelect = (sandwich) => {
    setOrder({ ...order, sandwich });
    setCurrentStep(1); // Auto-advance to bread selection
  };

  const handleBreadSelect = (bread) => {
    setOrder({ ...order, bread });
    setCurrentStep(2); // Auto-advance to toppings selection
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
🥪 *Sandwich:* ${translations.sandwiches[order.sandwich]}
🍞 *Bread:* ${translations.breads[order.bread]}
${order.toppings.length > 0 
  ? `🔸 *Toppings:*\n${order.toppings.map(topping => 
      `- ${translations.toppingsList[topping]}`).join('\n')}`
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
        />;
      case 1:
        return <BreadSelector 
          selectedBread={order.bread} 
          onSelect={handleBreadSelect}
        />;
      case 2:
        return <ToppingsSelector 
          selectedToppings={order.toppings} 
          onSelect={handleToppingsSelect}
        />;
      case 3:
        return <OrderSummary 
          order={order} 
          onSubmit={handleSubmitOrder}
          onPrint={handlePrintOrder}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center flex-1 min-w-0">
            <img 
              src="/images/theme/costa-kosher-symbol.jpg" 
              alt="Costa Kosher Symbol" 
              className="h-8 w-8 mr-3"
            />
            <Menu className="flex-shrink-0 mr-2" />
            <h1 className="text-base sm:text-xl font-bold truncate">{translations.title}</h1>
          </div>
          <div className="relative">
            <ShoppingCart size={20} />
            {order.sandwich && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Logo Image - Hidden on small screens */}
        <div className="hidden md:block fixed left-4 top-24">
          <img 
            src="/images/theme/costa-kosher.jpg" 
            alt="Costa Kosher" 
            className="w-auto h-[70vh] max-h-[800px] rounded-lg shadow-lg object-contain"
            style={{ maxWidth: '120px' }}
          />
        </div>

        {/* Main Content Area - Adjusted for logo space */}
        <div className="md:ml-32">
          {/* Progress Steps */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex justify-between items-center min-w-[500px] md:min-w-0">
              {translations.steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex-1 text-center px-1 ${index < currentStep ? 'text-green-400' : index === currentStep ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div className="relative">
                    {/* Progress Lines */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2">
                      {index !== 0 && (
                        <div 
                          className={`h-full absolute right-1/2 left-0 ${index <= currentStep ? 'bg-blue-400' : 'bg-gray-700'}`}
                        />
                      )}
                      {index !== translations.steps.length - 1 && (
                        <div 
                          className={`h-full absolute left-1/2 right-0 ${index < currentStep ? 'bg-blue-400' : 'bg-gray-700'}`}
                        />
                      )}
                    </div>
                    
                    {/* Circle with Number */}
                    <div 
                      className={`relative z-10 h-8 w-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                        index <= currentStep ? 'bg-blue-500' : 'bg-gray-700'
                      } border-4 border-gray-900`}
                    >
                      <span className="text-sm font-medium">
                        {index < currentStep ? '✓' : index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm whitespace-nowrap mt-1">{step}</div>
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
                    <p className="text-gray-100 text-center">
                      {translations.contactInstructions}
                    </p>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <label className="block text-sm text-gray-400 mb-2">
                    {translations.notes}
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder={translations.notesPlaceholder}
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
              {translations.back}
            </button>
            
            {currentStep < 3 ? (
              <button 
                onClick={nextStep}
                disabled={(currentStep === 0 && !order.sandwich) || (currentStep === 1 && !order.bread)}
                className={`px-4 py-2 rounded ${(currentStep === 0 && !order.sandwich) || (currentStep === 1 && !order.bread) ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {translations.next}
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrintOrder}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 flex items-center"
                >
                  <Printer className="mr-2" size={18} />
                  {translations.print}
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
                  {translations.whatsapp}
                </button>
              </div>
            )}
          </div>
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