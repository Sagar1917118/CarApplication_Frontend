import React from 'react';
import axios from 'axios';
import { useState,useEffect,useContext} from 'react';
import CarCard from './CarCard';
import useAuthToken from '../../Hooks/useAuthToken';
import API_URLS from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/dataContext';
const ActionModal = ({setOverLay,manipulationId}) => {
   const token=useAuthToken();
   const {setLoading}=useContext(DataContext);
   const navigate=useNavigate();
  async function onDelete(){
    try{
        console.log(token,API_URLS.DELETE_CAR,manipulationId);
        setLoading(true);
        const response=await axios.post(`${API_URLS.DELETE_CAR}`,{token:token,carId:manipulationId});
        console.log(response);
        setLoading(false);
    }
    catch(err){
        setLoading(false);
        console.log("Error in deleting the car",err)
    }
  }
  async function onUpdate(){
        navigate(`/update_car/${manipulationId}`);
  }
  return (
      <div className="w-[500px] absolute inset-0 m-auto backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <span className=' absolute top-2 right-2 text-sm italic cursor-pointer' onClick={()=>{setOverLay(false)}}>Cancel</span>
              <h2 className="text-xl font-semibold mb-4">Choose an Action</h2>
              <div className="flex space-x-4">
                  <button
                      onClick={onDelete}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  >
                      Delete
                  </button>
                  <button
                      onClick={onUpdate}
                      className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                  >
                      Update
                  </button>
              </div>
          </div>
      </div>
  );
};
const CarList = () => {
    const [cars,setCars]=useState([]);
    const [overLay,setOverLay]=useState(false);
    const token=useAuthToken();
    const [manipulationId,SetManipulationId]=useState("");
    const {setLoading}=useContext(DataContext);
    const getCar=async ()=>{
        try{
            setLoading(true);
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cars/get_car`,{token:token});
            console.log(response);
            setCars(response?.data);
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            console.log("Error in getting cars",err);
        }
    
    }
    useEffect(()=>{
        getCar();

    },[]);
    console.log(cars);
  return (
    <div className='flex flex-col gap-6 mt-10 relative min-h-screen'>
      {overLay && ( <ActionModal setOverLay={setOverLay} manipulationId={manipulationId}></ActionModal>)}

          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-600">Your Car Collection</h2>
    <div className="flex  flex-wrap gap-4 justify-center ">
      {cars.length>0 &&
      (cars.map((car, index) => (
        <CarCard setOverLay={setOverLay} key={index} car={car} SetManipulationId={SetManipulationId}/>
      ))
      )
    }

    </div>
    </div>
  );
};

export default CarList;
