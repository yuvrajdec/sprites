import React from 'react'
import Falling from '../../assets/Icons/Falling.svg'
import Pokeball from '../../assets/Icons/Pokeball.png'
import {Link , NavLink} from 'react-router-dom'


const Header = () => {
  return (
    <header className='shadow sticky z-50 top-0'>
      <nav className="h-18 w-full backdrop-blur-md font-sans text-white text-xl bg-black flex items-center gap-2 px-4">
        <img src={Pokeball} alt="falling" className='w-10 h-10 ' />

        <Link to="/home"
        className=' hover:text-gray-300 text-xl font-playwright-nz-basic font-bold '
        >Sprites</Link>

      <div className='h-auto w-auto flex gap-2 ml-auto'>

        <NavLink to="/about"
        className={({isActive})=> `${isActive ? "text-amber-300 underline" : "text-gray-200"}`}
        >
          about
        </NavLink>

        <NavLink to="/github"
        className={({isActive})=> `${isActive ? "text-amber-400" : "text-gray-200"}`}
        >
          github
        </NavLink>
      </div>
        
      </nav>
    </header>
  )
}

export default Header