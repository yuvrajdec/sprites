import React from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { SearchProvider } from './Context/SearchContext'

const Layout = () => {
  return (
    <>
    <SearchProvider>
      <Header/>
      <Outlet/>
    </SearchProvider>
    
    
    {/* <Footer/> */}
    </>
  )
}

export default Layout