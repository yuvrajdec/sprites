import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import VideoBg from '../../assets/Backgrounds/BgVideo.mp4'

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
      "#00FFFF", //cyan
      "#FFFFFF", //white

    ];

    const randomColors = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColors);
  },[])

  

  return (
  <div className='relative min-h-[calc(100vh-4.5rem)] w-full '>

    <div className=' w-full text-white grid place-items-center font-poppins
     overflow-hidden'  
    >
        <video 
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover -z-10'
        >
          <source src={VideoBg} type='video/mp4' />
        </video>

        <div className='absolute inset-0 bg-black/75'></div>
      

      <div className='h-50 w-auto pt-10 flex'>
        <input type="text"
        placeholder='pikachu'
        autoFocus
         className='h-20 w-60  bg-gray-900 rounded-l-full text-2xl text-white text-center border-amber-50 border border-r-0 focus:outline-none z-10'
        value={search}
        onChange={(e)=> setSearch(e.target.value)} />

      
        <div className='h-20 w-20 flex justify-center items-center backdrop-blur-md rounded-r-full text-4xl text-white bg-gray-900  border-white border border-l-0'>

          {/* <NavLink to='/infopage'> trued to use is to navigate to result page but now isntead it could be done using the handlesearch function for the same thing */} 
          <button className='bg-transparent h-16 w-16 rounded-full flex justify-center items-center'
          onClick={handleSearch}
          >
            <CiSearch className='text-4xl text-center text-white' />
          </button>
          {/* </NavLink> */}

        </div>

      
      </div>
      <div className='h-fit w-full flex flex-col justify-center items-center  text-5xl text-center font-poppins font-extralight soft-fade-up gap-1'>Instant{" "}
          <span style={{color}} className='font-poppins font-extrabold'>Pokémon</span>
          <span>Information</span>
          <span>At</span>
          <span className='font-bold'>YOUR</span>
          <span>Fingertips</span>
          <span>
            in a few
          </span>
          <span className='font-extrabold text-green-500 italic'>SECONDS!</span>
          
        </div>
    </div>
  </div>
  )
}

export default Home