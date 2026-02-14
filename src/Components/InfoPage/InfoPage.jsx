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
            {/* Height Weight Species */}
      <div className='h-15 w-auto bg-amber-500 grid grid-cols-3 gap-1 justify-around items-center pt-2 pb-2'>
        {/* Height */}
            <div className='h-auto w-auto grid place-items-center text-2xl border-r'>
              <span>
                {heightFt}
              </span>
              <span className='text-xs'>Height</span>
            </div>

            {/* weight */}

            <div className='h-auto w-auto grid place-items-center text-2xl border-r'>
              <span>
                {weightKg}
              </span>
              <span className='text-xs'>Weight</span>
            </div>
            {/* species */}
            <div className='h-auto w-auto grid place-items-center text-2xl'>
              <span>
                {genus?.replace("Pokémon", "")}
              </span>
              <span className='text-xs'>Species</span>
            </div>
      </div>

      {/* Evolutions */}

      <div className='h-fit w-auto bg-gray-500 flex justify-around'>
        {evolution.map((poke) => (
          <div
          key={poke.name}
          className='h-25 w-25 flex flex-col justify-end items-center bg-white border capitalize'  
          >
            <img className='min-h-10 max-h-full max-w-full object-contain' src={poke.image} alt="sprite" />
            <span>{poke.name}</span>
            <span className='text-xs text-gray-500'>#{poke.id}</span>
          </div>
        ))}
        
      </div>
      
    </div>
      

  </div>
  )
}

export default InfoPage