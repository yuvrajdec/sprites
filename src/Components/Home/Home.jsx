import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import VideoBg from '../../assets/Backgrounds/BgVideo.mp4'
import PikachuIMG from '../../assets/OtherImages/25.svg'
import { PiArrowBendDownLeftLight } from "react-icons/pi";
import PokemonTextLogo from '../../assets/OtherImages/PokemonTextLogo.png'



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
    // background 
  <div className='relative min-h-[calc(100vh-4.5rem)] w-full '>

  {/* video bavkground */}

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

        <div className='absolute inset-0 bg-black/75 -z-9'></div>
      
      {/* User Guide */}

      <div className='bg-transparent h-auto w-full z text-center p-5'>
        <span className='text-2xl font- font-light font-poppins'>
          Search by <span className='font-bold'>NAME</span> Or <span className='font-bold'>ID</span>
        </span>
      </div>

      {/* Pikachu Example for User */}

        <div className='grid grid-cols-3 bg-transparent text-center italic'>
        <span className='flex flex-col justify-center items-center text-xl'>Name : "Pikachu" <PiArrowBendDownLeftLight className='scale-x-[-1] text-4xl' /></span>
        
        <img 
        className='h-40'
        src={PikachuIMG} alt="Pikachu" />
        
        <span className='flex flex-col justify-center items-center text-2xl'>ID : "25" <PiArrowBendDownLeftLight /></span>
        </div>
        
      {/* Search Bar */}

      <div className='h-50 w-auto flex place-items-center'>
        <input type="text"
        placeholder='pikachu'
        autoFocus
         className='h-20 w-60  bg-gray-900 rounded-l-full text-2xl text-white text-center border-amber-50 border border-r-0 focus:outline-none z-10'
        value={search}
        onChange={(e)=> setSearch(e.target.value)} />

      
        <div className='h-20 w-20 flex justify-center items-center backdrop-blur-md rounded-r-full text-4xl text-white bg-gray-900  border-white border border-l-0'>

          {/* <NavLink to='/infopage'> tried to use it to navigate to result page but now isntead it could be done using the handlesearch function for the same thing */} 
          <button className='bg-transparent h-16 w-16 rounded-full flex justify-center items-center'
          onClick={handleSearch}
          >
            <CiSearch className='text-4xl text-center text-white' />
          </button>
          {/* </NavLink> */}

        </div>

      
      </div>

      {/* After Search Bar */}

      <div className='bg-transparent w-full font-poppins flex flex-col text-center -mt-5'>
        <span className='font-bold font-nunito text-7xl'>WHO IS</span>
        <span className='font-bold font-nunito text-8xl'>YOUR</span>
        <span className='font-bold font-nunito text-5xl'>FAVOURITE</span>
      </div>

      <img 
        className='h-auto w-70 -mt-5'
        src={PokemonTextLogo} alt="Logo" />
    
    </div>
  </div>
  )
}

export default Home