import React, { useEffect, useState } from 'react'
import BlueBackground from '../../assets/Backgrounds/BlueBackground.jpg'
import { FaGithub } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";


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

    const lastUpdated = data?.updated_at
  ? formatDistanceToNow(new Date(data.updated_at), { addSuffix: true })
  : "Loading...";

  const created = data?.created_at
  ? formatDistanceToNow(new Date(data.created_at), { addSuffix: true })
  : "Loading...";



    // setFollowCount((data.followers)+1); follower count can be updated without a state directly when mounting because it takes time to fetch data and in the meantime it makes the state store undefined value making infinite rendring and causing errors
    
  return (
    // Background Image Div
    <div className="min-h-[calc(100vh-4.5rem)] w-full bg-linear-to-r from-black to-gray-800 bg-cover bg-center"
    style={{backgroundImage: `url(${BlueBackground})`}}>
    
    {/* Div for Subtle Black Overlay */}
        <div className='min-h-[calc(100vh-4.5rem)] w-full bg-black/90 flex flex-col items-center'>
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
            <a href="https://github.com/yuvrajdec"
            target="_blank" 
            rel="noopener noreferrer">
                <FaGithub className='text-6xl text-white transition-colors duration-500 group-hover:text-black' />
            </a>
            
        </div>

        {/* Github Card Info like followers etc  */}

        <div className='grid grid-cols-3 justify-center items-center  gap-5 text-xl backdrop-blur-xs rounded h-fit m-5 p-5 w-full max-w-md text-white'>
        
        <div className='flex flex-col items-center text-center gap-1'>
        <span className='text-sm text-white uppercase tracking-wide'> Followers</span>
        <span>{data.followers}</span>
    
        </div>

        <div className='flex flex-col items-center text-center gap-1'>
            <span className='text-sm text-white uppercase tracking-wide'>Company</span>
            <span className='text-lg text-center'>{data.company || "-"}</span>
        </div>

        <div className='flex flex-col items-center text-center gap-1' >
            <span className='text-sm text-white uppercase tracking-wide' >Repositories</span>
            <span>{data.public_repos}</span>
        </div>
        
        <div className='flex flex-col items-center text-center gap-1' >
            <span className='text-sm text-white uppercase tracking-wide' >Following</span>
            <span>{data.following}</span>
        </div>

        <div className='flex flex-col items-center text-center gap-1' >
            <span className='text-sm text-white uppercase tracking-wide min-h-5' >Last Updated</span>
            <span className='text-xl'>{lastUpdated}</span>
        </div>

        <div className='flex flex-col items-center text-center gap-1' >
            <span className='text-sm text-white uppercase tracking-wide min-h-5' >Created</span>
            <span className='text-xl'>1 year ago</span>
        </div>
        
        
        </div>
     </div>
  </div>

  )
}

export default GithubPage

