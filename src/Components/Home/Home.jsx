import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';

const Home = () => {

  const {search , setSearch} = useContext(SearchContext);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate("/infopage");
  }

  const [color, setColor] = useState("#000");

  useEffect (()=>{
    const colors = [
      "#FF3B3B", // red
      "#3B82F6", // blue
      "#22C55E", // green
      "#F59E0B", // yellow
      "#A855F7", // purple
      "#EC4899", // pink
    ];

    const randomColors = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColors);
  },[])

  

  return (
    <div className='h-screen w-full bg-linear-to-b from-black to-gray-700 text-white flex flex-col '>
      <div className='h-50 w-auto py-18 px-8 flex'>
        <input type="text" className='h-20 w-60  backdrop-blur-md rounded-l-full text-4xl text-white text-center border-amber-50 border border-r-0'
        value={search}
        onChange={(e)=> setSearch(e.target.value)} />

      
        <div className='h-20 w-20 flex justify-center items-center backdrop-blur-md rounded-r-full text-4xl text-white  border-red-500 border border-l-0'>

          {/* <NavLink to='/infopage'> trued to use is to navigate to result page but now isntead it could be done using the handlesearch function for the same thing */} 
          <button className='bg-white h-16 w-16 rounded-full flex justify-center items-center'
          onClick={handleSearch}
          >
            <CiSearch className='text-4xl text-center text-red-500' />
          </button>
          {/* </NavLink> */}

        </div>

      
      </div>
      <div className='text-7xl text-center font-fredoka soft-fade-up'>Instant{" "}
          <span style={{color}} className='font-lilita'>Pokémon</span>{" "} Information at your fingertips
        </div>
    </div>
  )
}

export default Home