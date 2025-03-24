import { Pokemon } from "../../../shared/types";
import { getAllPokemons as getPokemonsService } from "../services/pokemonService";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  try {
    const pokemons = await getPokemonsService();
    return pokemons;
  } catch (error) {
    console.error("Error in fetchAllPokemons:", error);
    throw error;
  }
};
