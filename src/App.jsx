
import {Routes,Route} from "react-router-dom";
// Component import
import React, { useState,useEffect,useContext} from "react";
import Home from "./components/MyComponents/Home";
import CarList from "./components/MyComponents/CarList";
import Login from "./components/MyComponents/Authentication/Login";
import Signup from "./components/MyComponents/Authentication/Signup"
import CreateCarForm from "./components/MyComponents/CreateCarForm";
import AOS from "aos";
import Navbar from "./components/Navbar/Navbar";
import "aos/dist/aos.css";
import CarUpdateForm from "./components/MyComponents/CarUpdateForm";
import Loader from "./components/MyComponents/Loading/Loader";
import DataContext from "./context/dataContext";
const App = () => {
     // dark mode start
     const [theme, setTheme] = useState(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    const element = document.documentElement;
  
    useEffect(() => {
      if (theme === "dark") {
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, [theme]);
    // dark mode end
  
    React.useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
    }, []);
    const {loading}=useContext(DataContext);

  return (
    <>
     <Navbar theme={theme} setTheme={setTheme} />
     {(loading) && (<Loader></Loader>)}
    <Routes>
      <Route path="/" element={<Home theme={theme} setTheme={setTheme}></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/get_car_list" element={<CarList></CarList>}></Route>
      <Route path="/add_car" element={<CreateCarForm></CreateCarForm>}></Route>
      <Route path="/update_car/:id" element={<CarUpdateForm></CarUpdateForm>}></Route>
    </Routes>
    </>
  );
};

export default App;
