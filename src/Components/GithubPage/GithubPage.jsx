import React, { useEffect, useState } from 'react'
import BlueBackground from '../../assets/Backgrounds/BlueBackground.jpg'

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
    <div className="h-screen w-full bg-linear-to-r from-black to-gray-800 bg-cover bg-center"
    style={{backgroundImage: `url(${BlueBackground})`}}>
        <div className='h-screen w-full bg-black/75 flex flex-col justify-center items-center gap-5'>
        <div className='h-50 w-50 backdrop-blur-xs rounded bg-white/10 p-2'>
        <img src={data.avatar_url} alt="profile" />
        </div>

        <div className='flex flex-col text-4xl gap-4 text-white'>
        <span>@{data.login}</span>
        <span>{data.bio}</span>
        <span>{data.followers} Followers</span>
        <span>make it {data.followers + 1}</span>

        </div>
        </div>
    </div>
  )
}

export default GithubPage

