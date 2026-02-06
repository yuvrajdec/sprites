import React, { useEffect, useState } from 'react'
import BlueBackground from '../../assets/Backgrounds/BlueBackground.jpg'
import { FaGithub } from "react-icons/fa";

const GithubPage = () => {

    const [data, setData] = useState([]);
    // const [followCount,setFollowCount] = useState(0);

    const url = "https://api.github.com/users/yuvrajdec";

    useEffect(()=>{
        fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setData(data)  
    })
    },[])

    // setFollowCount((data.followers)+1); follower count can be updated without a state directly when mounting because it takes time to fetch data and in the meantime it makes the state store undefined value making infinite rendring and causing errors
    
  return (
    // Background Image Div
    <div className="h-screen w-full bg-linear-to-r from-black to-gray-800 bg-cover bg-center"
    style={{backgroundImage: `url(${BlueBackground})`}}>
    
    {/* Div for Subtle Black Overlay */}
        <div className='h-screen w-full bg-black/75 flex flex-col items-center'>
    {/* Profile Image */}
        <div className='relative h-fit w-full rounded text-2xl text-white'>
        <img className='opacity-40' src={data.avatar_url} alt="profile" />

        {/* Name and Username with postioned on Github Logo  */}
        
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-15 z-20 flex flex-col justify-center items-center'>
            <span className='text-3xl font-nunito font-bold'>{data.name}</span>
            <span className='text-base font-nunito'>@{data.login}</span>

        </div>
        
        </div>

        {/* Github Logo */}

        <div className='group h-20 w-20 rounded-full bg-red-500 ml-auto mr-auto -mt-10 z-10 flex justify-center items-center shadow-black hover:bg-white'>
            <FaGithub className='text-6xl text-white transition-colors duration-500 group-hover:text-black' />
        </div>

        {/* Github Card Info like followers etc  */}

        <div className='grid grid-cols-3 justify-center items-center  gap-4 text-xl backdrop-blur-xs bg-white rounded w-auto h-fit m-5 p-5'>
        
        <div className='flex flex-col justify-start items-center'>
        <span className='text-lg text-gray-500'> Followers</span>
        <span>{data.followers}</span>
    
        </div>

        <div className='flex flex-col justify-start items-center'>
            <span className='text-lg text-gray-500'>Company</span>
            <span className='text-lg text-center'>{data.company || "-"}</span>
        </div>

        <div className='flex flex-col justify-start items-center' >
            <span className='flex flex-col justify-center items-center text-lg text-gray-500' >Repositories</span>
            <span>{data.public_repos}</span>
        </div>
        
        </div>
     </div>
  </div>
  
  )
}

export default GithubPage

