import React, { useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from "../../../utils/API";
import DataContext from '../../../context/dataContext';
const Signup = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {setLoading}=useContext(DataContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(API_URL.SIGNUP)
        setLoading(true);
      const response = await axios.post(`${API_URL.SIGNUP}`, formData);
      console.log('Signup Response:', response.data);
      setLoading(false);
      // Handle successful signup
    } catch (error) {
      setLoading(false);
      console.error('Error in Signup:', error);
      // Handle signup error
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white font-semibold py-2 rounded-lg hover:bg-purple-800 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className='w-full flex justify-center gap-10 mt-4 -mb-6 italic text-sm underline' >
        <span className="cursor-pointer" onClick={()=>{navigate("/")}}>home</span>
        <span className="cursor-pointer" onClick={()=>{navigate("/login")}}>login</span>
         </div>
      </div>
    </div>
  );
};

export default Signup;
