import { pokemonService } from "./../services/pokemonService";
import { Favorite, Pokemon } from "../../../shared/types";
import { FetchPokemonsParams } from "../types/api-types";

const fetchPokemons = async ({
  page,
}: FetchPokemonsParams): Promise<Pokemon[]> => {
  try {
    const pokemons = await pokemonService.fetchPokemons({ page });
    return pokemons;
  } catch (error) {
    console.error("Error in fetchAllPokemons:", error);
    throw error;
  }
};

const fetchFavorites = async (): Promise<Favorite[]> => {
  try {
    const favorites = await pokemonService.fetchFavorites();
    return favorites;
  } catch (error) {
    console.error("Error in fetchFavorites:", error);
    throw error;
  }
};

const addFavorite = async (pokemonId: number) => {
  try {
    const favorite = await pokemonService.addFavorite(pokemonId);
    return favorite;
  } catch (error) {
    console.error("Error in addFavorite:", error);
    throw error;
  }
};

const deleteFavorite = async (pokemonId: number) => {
  try {
    const favorite = await pokemonService.deleteFavorite(pokemonId);
    return favorite;
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
