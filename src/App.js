import React, {useState, useEffect} from 'react'
import {getAllPokemon} from './Components/Services/pokemon';
import {getPokemon} from './Components/Services/pokemonTwo';
import NavBar from './Components/Layout/NavBar/NavBar';
import Card from './Components/Layout/Card/Card';
import './App.css';

function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState(""); 
  const [prevURL, setPrevURL] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextURL(response.next);
      setPrevURL(response.previous);
      let poke = await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadingPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false) 
  }

  const prev = async () => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadingPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false) 
  }

  const loadingPokemon = async (data) => {
    let pokemons = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }))

    setPokemonData(pokemons); 
  }

  return (
    <div>
      {
        loading ? <h1>Loading Pokemon...</h1> : (
        <>
          <NavBar />
          <div className="btn">
            <button onClick={prev}>Previous</button>
            <button onClick={next}>Next</button>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon) => {
              return(
                <Card key={pokemon.id} pokemon={pokemon} />
              )
            })}
          </div>
        </>
      )
      }
      <div className="btn">
            <button  className="btn button" onClick={prev}>Previous</button>
            <button className="btn button" onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default App;
