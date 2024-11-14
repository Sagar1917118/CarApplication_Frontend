import React, { useState,useContext} from 'react';
import API_URLS from '../../utils/API';
import axios from 'axios';
import useAuthToken from '../../Hooks/useAuthToken';
import { useParams } from 'react-router-dom';
import DataContext from '../../context/dataContext';
const CreateUpdateForm = () => {
  // State for form data and response messages
  const {setLoading}=useContext(DataContext);
  const token=useAuthToken();
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    carname: '',
    brand: '',
    category: '',
    price: '',
    fuelType: '',
    type: 'manual',
    features: '', // Change to store only one selected feature
  });
  const [responseMessage, setResponseMessage] = useState({
    message: '',
    type: '', // 'success' or 'error'
  });

  // Handler to handle input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'features') {
      // Handle adding/removing features from the array
      setFormData(prevData => {
        let updatedFeatures = [...prevData.features];
        if (checked) {
          // Add feature to array if checked
          updatedFeatures.push(value);
        } else {
          // Remove feature from array if unchecked
          updatedFeatures = updatedFeatures.filter(feature => feature !== value);
        }

        return { ...prevData, features: updatedFeatures };
      });
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit handler to create the car
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form validation if needed
    if (!formData.carname || !formData.price) {
      setResponseMessage({
        message: 'Car name and price are required!',
        type: 'error',
      });
      return;
    }

    try {
      console.log(API_URLS.UPDATE_CAR,formData,id)
      setLoading(true);
      const response=await axios.post(`${API_URLS.UPDATE_CAR}`,{id:id,data:formData})
      console.log(response);
      // Success response
      setResponseMessage({
        message: 'Car created successfully!',
        type: 'success',
      });

      // Reset form
      setFormData({
        carname: '',
        brand: '',
        category: '',
        price: '',
        fuelType: '',
        type: 'manual',
        features: '',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setResponseMessage({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className="mt-10 max-w-lg mx-auto p-6 bg-white border rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-purple-600">Update your Car Details</h2>
      
      {/* Feedback Message */}
      {responseMessage.message && (
        <div
          className={`p-4 mb-4 rounded-md text-white ${
            responseMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {responseMessage.message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Car Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="carname">
            Car Name
          </label>
          <input
            type="text"
            id="carname"
            name="carname"
            value={formData.carname}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="brand">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

         {/* Category (Dropdown) */}
         <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Electric">Electric</option>
            <option value="Convertible">Convertible</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Coupe">Coupe</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="fuelType">
            Fuel Type
          </label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Transmission Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold" htmlFor="type">
            Transmission Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
            <option value="semiautomatic">Semiautomatic</option>
          </select>
        </div>

       

        {/* Features as Checkboxes */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Features</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {[
              'antiLockBraking',
              'tractionControl',
              'driverAirBag',
              'powerDoorLocks',
              'vanityMirror',
              'bluetooth',
              'rainSensingWiper',
            ].map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  checked={formData.features.includes(feature)} // Check if feature is selected
                  onChange={handleChange}
                  className="form-checkbox text-purple-500"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Create Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateForm;
