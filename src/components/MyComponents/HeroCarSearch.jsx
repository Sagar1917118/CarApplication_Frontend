import React, { useEffect, useState } from 'react';

function HeroCarSearch({theme,setItem}) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(()=>{
    if(theme=='dark'){
       setDarkMode(true);
    }
    else{
      setDarkMode(false);
    }
  },[theme]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const activateSearchMode = () => setIsSearchMode(true);
  const deactivateSearchMode = () => setIsSearchMode(false);

  return (
    <div className={`flex flex-col items-center p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-800'}`}>

      <h2 className="text-center text-sm mt-8">
        Search For Car that interests you
      </h2>
      <h1 className="text-3xl sm:text-5xl font-bold mt-2">
        Find Your Dream Car
      </h1>

      {/* Conditionally render the search bar or input box based on search mode */}
      <div className={`mt-6 w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between bg-white rounded-full shadow-lg p-10 md:p-2 ${isSearchMode ? 'hidden' : 'flex'}`}>
        <select className="w-full sm:w-auto bg-white text-gray-700 text-lg rounded-full py-2 px-4 focus:outline-none">
          <option>Cars</option>
          <option>SUV</option>
          <option>Convertible</option>
          <option>Truck</option>
          <option>Electric</option>
        </select>
        
        <span className="hidden sm:block mx-2 h-8 border-l border-gray-300"></span>
        
        <select className="w-full sm:w-auto bg-white text-gray-700 text-lg rounded-full py-2 px-4 mt-2 sm:mt-0 focus:outline-none">
          <option>Car Makes</option>
          <option>Tesla</option>
          <option>BMW</option>
          <option>Mercedes</option>
          <option>Audi</option>
        </select>
        
        <span className="hidden sm:block mx-2 h-8 border-l border-gray-300"></span>
        
        <select className="w-full sm:w-auto bg-white text-gray-700 text-lg rounded-full py-2 px-4 mt-2 sm:mt-0 focus:outline-none">
          <option>Pricing</option>
          <option>Under $20,000</option>
          <option>$20,000 - $50,000</option>
          <option>$50,000 - $100,000</option>
          <option>Over $100,000</option>
        </select>
        
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 mt-2 sm:mt-0 sm:ml-4"
          onClick={activateSearchMode}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>

      {/* Render the input search box when in search mode */}
      {isSearchMode && (
        <div className="relative mt-6 w-full max-w-3xl flex items-center bg-white rounded-full shadow-lg p-4">
         <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>
          <input
            type="text"
            placeholder="Search for cars..."
            className="w-full bg-white text-gray-700 text-lg rounded-full py-2 px-4 focus:outline-none"
          />
          <button 
            className="absolute right-4 text-gray-500 text-2xl"
            onClick={deactivateSearchMode}
          >
            ×
          </button>
        </div>
      )}

      <img src="https://car-marketplace.tubeguruji.com/tesla.png" alt="Tesla" className="mt-8 w-3/4" />
    </div>
  );
}

export default HeroCarSearch;
