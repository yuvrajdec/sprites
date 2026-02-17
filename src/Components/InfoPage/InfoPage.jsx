import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../Context/SearchContext';
import BlackBg from '../../assets/Backgrounds/BlackBg.png'
import { typeIcons } from '../../assets/images';
import {Link , NavLink} from 'react-router-dom'


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

// don't need it now because we already fetched this so dont need to fetch same thing twice (need to understand this)
//   useEffect(()=>{
//     const fetchResult = async () => {
//       try {
//         const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}
// `);
//         const result2 = await response2.json();
//         setSpeciesGenus(result2);

//       } catch (err) {
//         console.error(err);
//       } finally {
//         console.log("false");
        
//       }
//     };

//     if (search) fetchResult();
//   },[search]);

  const getEvolutionChain = async (chain) => {
  const evoArray = [];

  const traverse = async (node) => {
    const pokeRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${node.species.name}`
    );
    const pokeData = await pokeRes.json();

    evoArray.push({
      name: node.species.name,
      id: pokeData.id,
      image:
        pokeData.sprites.other?.showdown?.front_default ||
        pokeData.sprites.other?.['official-artwork']?.front_default ||
        pokeData.sprites.front_default ,
    });

    for (const evo of node.evolves_to) {
      await traverse(evo);
    }
  };

  await traverse(chain);
  return evoArray;
};

  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}`);
        const speciesData = await speciesRes.json();

        setSpeciesGenus(speciesData);

        const evoRes = await fetch (speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        // old evolution logic
        // const evoChain = [];
        // let current = evoData.chain;




        // new evolution logic
        const evoChain = await getEvolutionChain(evoData.chain);

        // old logic which 70% I didnt understand 
        // while (current) {

        //   const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`);

        //   const pokedata = await pokeRes.json();

        //   evoChain.push({
        //     name : current.species.name,
        //     image : pokedata.sprites.other?.showdown?.front_default,
        //     id: pokedata.id
        //   }
        //   );
        //   current = current.evolves_to[0];
        // }


        // new evolution fixed logic did not understand most of it will check it later  
        


        setEvolution(evoChain);

      } catch (err) {
        console.error(err);
        
      }
    };

      if (search) fetchEvolution();

  },[search])


  if (loading) return <div className='min-h-[calc(100vh-4.5rem)] bg-gray-900 flex justify-center items-center'>
    <span class="loader"></span>
    </div>;

  if (!data) return <div className='min-h-[calc(100vh-4.5rem)] bg-gray-900 flex flex-col justify-center items-center text-center text-white gap-5'>
    <span className='font-poppins text-2xl font-extrabold text-white' >No Results Found</span>
    <Link to="/">
    <button className='h-15 w-50 bg-white font-bold font-nunito text-black text-3xl cursor-pointer' >Back</button>
    </Link>
    
    </div>;

  const heightFt = (((data.height/10)*3.28084).toFixed(2));

  const weightKg = (data.weight / 10).toFixed(1);
  const weightLbs = ((data.weight / 10) * 2.20462).toFixed(1);

// need to understand this code later 
  const genus = speciesGenus?.genera?.find(
    (g) => g.language.name ==="en"
  )?.genus;

  return (
    // background image
    <div className="h-fit w-full  bg-cover bg-no-repeat"
    style={{backgroundImage: `url(${BlackBg})`}}
    >
      {/* name and id */}
      <div className=' flex justify-between font-poppins capitalize font-bold text-2xl text-white p-5'>
        <span>{data.name}</span>
        <span className='text-xl'>#{data.id}</span>
      </div>

      <div className='h-50 flex justify-center items-end '>
        {/* <img className='h-full w-auto' src={data.sprites.other['official-artwork'].front_default} alt="sprite" /> */}
        <img className='max-h-35 min-h-25 w-auto' src={data?.sprites?.other?.dream_world?.front_default || data?.sprites?.other?.['official-artwork']?.front_default || data?.sprites?.front_default } alt="sprite" />
      </div>

      {/* Pokemon Details */}
      <div className=' h-fit w-full'>

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
            <div className='h-auto w-auto flex flex-col justify-center items-center text-center'>
              <span className='font-semibold sm:text-sm md:text-md lg:text-lg'>
                {genus?.replace("Pokémon", "")}
              </span>
              <span className='text-xs'>Species</span>
            </div>
      </div>

      {/* Evolutions */}
            <div className='h-15 bg-transparent text-center flex justify-center items-center'>
              <span className='text-3xl font-poppins font-semibold'>Evolution</span>
            </div>

      <div className='h-fit w-auto bg-transparent flex justify-center flex-wrap font-poppins'>
        {evolution.map((poke) => (
          <div
          key={poke.name}
          className='h-30 w-30 flex flex-col justify-end items-center bg-transparent capitalize gap-2'  
          >
            <img className='min-h-10 max-h-20 max-w-25 object-contain' src={poke.image} alt="sprite" />

            <div className='flex flex-col justify-center items-center gap-0.5'>
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