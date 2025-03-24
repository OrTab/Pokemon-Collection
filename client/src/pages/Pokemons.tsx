import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchPokemons } from "../store/pokemon/pokemonSlice";

export const Pokemons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemons, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Pokemons</h1>
      <div className='pokemon-list'>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className='pokemon-card'>
            <h2>{pokemon.name}</h2>
            {/* Add more pokemon details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};
