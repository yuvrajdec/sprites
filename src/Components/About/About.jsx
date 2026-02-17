import React from 'react'
import PikachuBg from '../../assets/Backgrounds/PikachuBg.jpg'
import { PiArrowBendDownLeftLight } from "react-icons/pi";
import PikachuIMG from '../../assets/OtherImages/25.png'

const About = () => {
  return (
    <div className="min-h-[calc(100vh-4.5rem)] w-full bg-cover bg-center bg-no-repeat"
    style={{backgroundImage: `url(${PikachuBg})`}}
    >
      <div className='min-h-[calc(100vh-4.5rem)] w-full backdrop-blur-lg bg-black/50'>

      <div className='h-fit w-full text-center text-3xl text-white font-nunito p-10 font-semibold flex flex-col gap-10'>
        <span className='h-auto'>
          Welcome To PokéDex
        </span>

        <div className='text-base font-light font-poppins flex flex-col gap-5'>
          <span>PokéDex is a site where YOU can search about any Pokemon and get any information like their TYPE , STATS , IMAGES and MORE.</span>

          <span className='text-xl font-semibold'>
            Just type their NAME or ID
          </span>
        </div>
        
      </div>

      <div className='grid grid-cols-2 bg-transparent text-center italic text-white'>
              <span className='flex flex-col justify-center items-end text-xl'>Name : "Pikachu"
              
              <span className='flex flex-col items-end text-2xl '>ID : "25" </span>
              <PiArrowBendDownLeftLight className='text-3xl scale-x-[-1]' />
              </span>
              
              <img 
              className='h-full flex justify-center items-center'
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/brilliant-diamond-shining-pearl/25.png" alt="Pikachu" />
              
              
              </div>


              <div className='grid grid-cols-2 bg-transparent text-center italic text-white'>
              <span className='flex flex-col justify-center items-end text-xl'>Name : "Mewtwo"
              
              <span className='flex flex-col items-end text-2xl '>ID : "150" <PiArrowBendDownLeftLight className='text-3xl scale-x-[-1]' /></span>
              </span>
              
              <img 
              className='h-full flex'
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/brilliant-diamond-shining-pearl/150.png" alt="Mewtwo" />
              
              
              </div>

      </div>

    </div>
  )
}

export default About