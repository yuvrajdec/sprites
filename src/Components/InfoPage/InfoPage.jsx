import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../Context/SearchContext';
import BlackBg from '../../assets/Backgrounds/BlackBg.png'
import { typeIcons } from '../../assets/images';


const InfoPage = () => {

  const { search } = useContext(SearchContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [speciesGenus, setSpeciesGenus] = useState("");

  const [evolution, setEvolution] = useState([]);

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


  useEffect(()=>{
    const fetchResult = async () => {
      try {
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}
`);
        const result2 = await response2.json();
        setSpeciesGenus(result2);

      } catch (err) {
        console.error(err);
      } finally {
        console.log("false");
        
      }
    };

    if (search) fetchResult();
  },[search]);

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}`);
        const speciesData = await speciesRes.json();

        setSpeciesGenus(speciesData);

        const evoRes = await fetch (speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoChain = [];
        let current = evoData.chain;

        while (current) {

          const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`);

          const pokedata = await pokeRes.json();

          evoChain.push({
            name : current.species.name,
            image : pokedata.sprites.other?.showdown?.front_default,
            id: pokedata.id
          }
          );
          current = current.evolves_to[0];
        }

        setEvolution(evoChain);

      } catch (err) {
        console.error(err);
        
      }
    };

      if (search) fetchEvolution();

  },[search])





  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No Results Found</p>

  const heightFt = (((data.height/10)*3.28084).toFixed(2));

  const weightKg = (data.weight / 10).toFixed(1);
  const weightLbs = ((data.weight / 10) * 2.20462).toFixed(1);

// need to understand this code later 
  const genus = speciesGenus?.genera?.find(
    (g) => g.language.name ==="en"
  )?.genus;

  return (
    <div className="h-fit w-full bg-linear-to-b from-black to-gray-800 bg-cover bg-no-repeat "
    style={{backgroundImage: `url(${BlackBg})`}}
    >
      <div className='flex justify-between font-poppins capitalize font-bold text-3xl text-white p-5'>
        <span>{data.name}</span>
        <span className='text-2xl'>#{data.id}</span>
      </div>
      <div className='h-1/3 bg-transparent flex justify-center items-center'>
        {/* <img className='h-full w-auto' src={data.sprites.other['official-artwork'].front_default} alt="sprite" /> */}
        <img className='h-50 w-auto mt-10' src={data.sprites.other.showdown.front_default} alt="sprite" />
      </div>

      {/* Pokemon Details */}
      <div className=' h-fit w-full bg-transparent'>

        <div className='p-2 grid
         bg-transparent place-items-center gap-2'>

        {/* not needed anymore already displaying name on top */}
        {/* <div className='h-fit w-fit p-1 bg-white box-border border-2 flex justify-center items-center'>
          <span className=' text-black text-3xl font-mono'>{capitalize(data.name)}</span>
        </div>  */}

        <div className='h-fit w-fit p-1 box-border flex justify-center items-center gap-2'>
            {data.types.map((t) => (
              <div key={t.type.name}
              className='h-fit w-fit bg-white box-border border-2 flex justify-center items-center'>
                <img 
                className='max-h-8 min-h-5 w-auto rounded-full p-1'
                src={typeIcons[t.type.name]} alt="type" />
                <span
              key={t.type.name}
              className='capitalize text-black text-md font-poppins p-1 font-semibold'
              >
                {capitalize(t.type.name)}
              </span>
              </div>
              
            ))}
          </div>

      </div>
            {/* Height Weight Species */}
      <div className='h-fit w-auto bg-transparent grid grid-cols-3 justify-around items-center pt-2 pb-2 font-poppins text-xl'>
        {/* Height */}
            <div className='h-auto w-auto grid place-items-center border-r-2 border-gray-500'>
              <span className='font-semibold'>
                {heightFt}
              </span>
              <span className='text-xs'>Height (ft)</span>
            </div>

            {/* weight */}

            <div className='h-auto w-auto grid place-items-center text-2xl border-r-2 border-gray-500'>
              <span className='font-semibold'>
                {weightKg}
              </span>
              <span className='text-xs'>Weight (kg)</span>
            </div>
            {/* species */}
            <div className='h-auto w-auto flex flex-col justify-center items-center text-2xl text-center'>
              <span className='text-lg font-semibold'>
                {genus?.replace("Pokémon", "")}
              </span>
              <span className='text-xs'>Species</span>
            </div>
      </div>

      {/* Evolutions */}
            <div className='bg-transparent text-center pt-5'>
              <span className='text-3xl font-poppins font-semibold'>Evolution</span>
            </div>

      <div className='h-fit w-auto bg-transparent flex justify-around font-poppins'>
        {evolution.map((poke) => (
          <div
          key={poke.name}
          className='h-30 w-30 flex flex-col justify-end items-center bg-transparent capitalize gap-2'  
          >
            <img className='min-h-10 max-h-full max-w-full object-contain' src={poke.image} alt="sprite" />

            <div className='flex flex-col justify-center items-center gap-0'>
              <span className='leading-none'>{poke.name}</span>
            <span className='text-xs text-gray-500'>#{poke.id}</span>
            </div>
            
          </div>
        ))}
        
      </div>
      
    </div>
      

  </div>
  )
}

export default InfoPage