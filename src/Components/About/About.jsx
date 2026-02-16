import React from 'react'
import PikachuBg from '../../assets/Backgrounds/PikachuBg.jpg'

const About = () => {
  return (
    <div className="h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
    style={{backgroundImage: `url(${PikachuBg})`,
            height: "calc(100vh - 72px)"}}
    >
      <div className='h-full w-full backdrop-blur-lg bg-black/50'>

      <div className='h-auto w-full text-center text-3xl text-white font-nunito p-10 font-semibold flex flex-col gap-10'>
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

      </div>

    </div>
  )
}

export default About