import { getAllPokemons as getPokemonsService } from "../services/pokemonService";
import { Pokemon } from "../store/pokemon/types";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  try {
    const pokemons = await getPokemonsService();
    return pokemons;
  } catch (error) {
    console.error("Error in fetchAllPokemons:", error);
    throw error;
  }
};
