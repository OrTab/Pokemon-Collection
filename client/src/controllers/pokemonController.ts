import { Pokemon } from "../../../shared/types";
import { fetchPokemons } from "../services/pokemonService";
import { FetchPokemonsParams } from "../types/api-types";

export const fetchAllPokemons = async ({
  page,
}: FetchPokemonsParams): Promise<Pokemon[]> => {
  try {
    const pokemons = await fetchPokemons({ page });
    return pokemons;
  } catch (error) {
    console.error("Error in fetchAllPokemons:", error);
    throw error;
  }
};
