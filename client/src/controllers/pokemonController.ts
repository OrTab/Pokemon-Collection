import { pokemonService } from "./../services/pokemonService";
import { Favorite, Pokemon } from "../../../shared/types";
import { FetchPokemonsParams } from "../types/api-types";

const fetchPokemons = async ({
  page,
}: FetchPokemonsParams): Promise<Pokemon[]> => {
  try {
    return pokemonService.fetchPokemons({ page });
  } catch (error) {
    console.error("Error in fetchAllPokemons:", error);
    throw error;
  }
};

const fetchFavorites = async (): Promise<Favorite[]> => {
  try {
    return await pokemonService.fetchFavorites();
  } catch (error) {
    console.error("Error in fetchFavorites:", error);
    throw error;
  }
};

const addFavorite = async (pokemonId: number) => {
  try {
    return await pokemonService.addFavorite(pokemonId);
  } catch (error) {
    console.error("Error in addFavorite:", error);
    throw error;
  }
};

const deleteFavorite = async (pokemonId: number) => {
  try {
    return await pokemonService.deleteFavorite(pokemonId);
  } catch (error) {
    console.error("Error in deleteFavorite:", error);
    throw error;
  }
};

export const pokemonController = {
  addFavorite,
  fetchPokemons,
  fetchFavorites,
  deleteFavorite,
};
