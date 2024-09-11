import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pokémon list from the API
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        ); // Fetch first 150 Pokémons
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokeDetails = await axios.get(pokemon.url); // Fetch each Pokémon's details
            return pokeDetails.data;
          })
        );
        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, []);

  if (loading) {
    return <div>Loading Pokémon...</div>;
  }

  return (
    <div className="pokemon-container">
      <h1>Pokémon List</h1>
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <div className="pokemon-card" key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <p>
              <strong>ID:</strong> {pokemon.id}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
