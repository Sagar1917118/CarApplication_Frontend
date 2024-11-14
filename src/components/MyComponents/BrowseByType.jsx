import React, { useEffect, useState } from 'react';
import { FaCarSide, FaChargingStation, FaTruck} from 'react-icons/fa';
import { MdElectricCar } from 'react-icons/md';
import { RiTruckLine, RiCarLine } from 'react-icons/ri';  // Use RiCarLine as a replacement


function BrowseByType({theme}) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(()=>{
    if(theme=='dark'){
        setDarkMode(true);
     }
     else{
       setDarkMode(false);
     }
  },[theme]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const types = [
    { name: 'SUV', icon: <FaCarSide /> },
    { name: 'Sedan', icon: <FaCarSide /> },
    { name: 'Hatchback', icon: <FaCarSide /> },
    { name: 'Electric', icon: <MdElectricCar /> },
    { name: 'Convertible', icon: <RiCarLine /> },  // Replacement icon for Convertible
    { name: 'Hybrid', icon: <FaChargingStation /> },
    { name: 'Coupe', icon: <FaCarSide /> },
    // { name: 'Van', icon: <FaVanShuttle /> },
    { name: 'Truck', icon: <RiTruckLine /> },
  ];
  return (
    <div className={`p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <h2 className="text-2xl font-bold text-center mb-6">Browse By Type</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {types.map((type) => (
          <div
            key={type.name}
            className={`flex flex-col items-center p-4 rounded-lg shadow-md ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
            } hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="text-3xl mb-2">{type.icon}</div>
            <p className="text-lg font-semibold">{type.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseByType;
