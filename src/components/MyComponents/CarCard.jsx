import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaHeart, FaSearchPlus } from 'react-icons/fa';

const CarCard = ({ setOverLay,car ,SetManipulationId}) => {
  const { carname, brand, category, price, fuelType, type, images, features,_id} = car;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 w-72 text-center shadow-md relative bg-white">
      {/* Image Container */}
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={`${carname} - ${currentIndex + 1}`}
          className="w-full h-40 object-cover rounded-lg"
        />
        
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FaArrowLeft size={14} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FaArrowRight size={14} />
        </button>

        {/* Zoom-in Icon */}
        <div onClick={()=>{setOverLay(true);SetManipulationId(_id)}} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <FaSearchPlus size={14} />
        </div>
        {/* active dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? 'bg-gray-800' : 'bg-gray-200'
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Car Details */}
      <div className="mt-4 text-left">
        <h3 className="text-lg font-semibold truncate">{carname}</h3>
        <p className="text-gray-500 text-sm mt-1">{`${category} · ${fuelType} · ${type}`}</p>
      </div>

      {/* Price and EMI */}
      <div className="mt-3 text-left">
        <p className="text-purple-700 font-bold text-xl">₹{price.toLocaleString()} Lakh</p>
      </div>

    </div>
  );
};

export default CarCard;
