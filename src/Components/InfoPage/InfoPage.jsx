import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../Context/SearchContext';
import BlackBg from '../../assets/Backgrounds/BlackBg.png'
import { typeIcons } from '../../assets/images';


const InfoPage = () => {

  const { search } = useContext(SearchContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const capitalize = (word) => {

    return word[0]?.toUpperCase() + word.slice(1);
  }

  

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        const result = await response.json();
        setData(result);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (search) fetchData();
  },[search]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No Results Found</p>

  const heightFt = (((data.height/10)*3.28084).toFixed(2));

  const weightKg = (data.weight / 10).toFixed(2);
  const weightLbs = ((data.weight / 10) * 2.20462).toFixed(2);

  return (
    <div className="h-screen w-full bg-linear-to-b from-black to-gray-800 bg-contain bg-no-repeat "
    style={{backgroundImage: `url(${BlackBg})`}}
    >
      <div className='h-1/3 bg-transparent flex justify-center items-center'>
        {/* <img className='h-full w-auto' src={data.sprites.other['official-artwork'].front_default} alt="sprite" /> */}
        <img className='h-29/30 w-auto mt-25' src={data.sprites.other.showdown.front_default} alt="sprite" />
      </div>

      {/* Pokemon Details */}
      <div className='h-screen w-full bg-gray-400'>

        <div className='pt-15 grid bg-amber-300 place-items-center gap-2'>
        <div className='h-fit w-fit p-1 bg-white box-border border-2 flex justify-center items-center'>
          <span className=' text-black text-3xl font-mono'>{capitalize(data.name)}</span>
        </div> 

        <div className='h-fit w-fit p-1 box-border flex justify-center items-center gap-2'>
            {data.types.map((t) => (
              <div key={t.type.name}
              className='h-fit w-fit bg-white box-border border-2 flex justify-center items-center'>
                <img 
                className='h-10 w-auto rounded-full p-1'
                src={typeIcons[t.type.name]} alt="type" />
                <span
              key={t.type.name}
              className='capitalize text-black text-md font-fredoka p-2'
              >
                {capitalize(t.type.name)}
              </span>
              </div>
              
            ))}
          </div>

      </div>

      <div className='h-fit w-auto bg-amber-500 flex'>
        {/* Height */}
            <div className='flex flex-col'>
              <span>
                {heightFt}
              </span>
              <span>Height (ft)</span>
            </div>

            {/* weight */}

            <div className='flex flex-col'>
              <span>
                {weightKg}
              </span>
              <span>Weight (kg)</span>
            </div>
      </div>
      
    </div>
      

  </div>
  )
}

export default InfoPage