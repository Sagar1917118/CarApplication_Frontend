import React, { useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from "../../../utils/API";
import {useCookies } from 'react-cookie'
import DataContext from '../../../context/dataContext';
const Login = () => {
    const [cookies, setCookie] = useCookies(['car_management_user_token'])
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
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
      setLoading(true);
        console.log(API_URL.LOGIN);
      const response = await axios.post(`${API_URL.LOGIN}`, formData);
      console.log('Login Response:', response.data);
      const user_payload={token:response?.data.token};
      // cookie will expire in 3 days
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      setCookie('car_management_user_token', user_payload, { path: '/' ,expires: expires});
      setLoading(false);
      navigate("/");
      // Handle successful login
    } catch (error) {
      setLoading(false);
      console.error('Error in Login:', error.message);
      // Handle login error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">Login</h2>
        <button onClick={()=>{setFormData({email:"sagar@gmail.com",password:"sagar@123"})}}className='p-2 bg-purple-300 rounded-sm hover:bg-purple-500'>Auto Fill</button>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
        <div className='w-full flex justify-center gap-10 mt-4 -mb-6 italic text-sm underline' >
        <span className="cursor-pointer" onClick={()=>{navigate("/")}}>home</span>
        <span  className="cursor-pointer" onClick={()=>{navigate("/signup")}}>signup</span>
         </div>
      </div>
    </div>
  );
};

export default Login;
