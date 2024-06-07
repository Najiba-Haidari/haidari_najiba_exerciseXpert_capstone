import './App.css'
// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home.jsx'
import Signup from './components/pages/Signup/Signup.jsx'
import Login from './components/pages/Login/Login.jsx'
import Nav from './components/Nav.jsx'
import Search from './components/pages/Search/Search.jsx'
import SavedEx from './components/pages/SavedEx/SavedEx.jsx'
// import Instructions from './components/pages/Instructions/Instructions.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'



function App() {
const [isLoggedIn, setIsLoggedIn]= useState(false)
const [bodyParts, setBodyParts] = useState([])
const url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
const API_KEY = "cee23baa0amshab7b2d353f6de30p134a0ajsnc54ace73156b";

const getData = async function () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    setBodyParts(data)
    // console.log(bodyParts)

  } catch (error) {
    console.error(error)
  }
}
useEffect(() => {
  getData()
}, [])

const logout = () => {
  // Clear client-side token or any other logout logic
  setIsLoggedIn(false);
};

  return (
    <div className='image'>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} logout={logout}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search getData={getData} bodyParts={bodyParts} setBodyParts={setBodyParts} isLoggedIn={isLoggedIn}/>}/>
        {/* <Route path='/search/instructions/:name' element={<Instructions />} /> */}
        <Route path='/saved' element={<SavedEx isLoggedIn={isLoggedIn}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/logout" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
