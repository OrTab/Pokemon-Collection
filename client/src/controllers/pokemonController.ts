import { pokemonService } from "./../services/pokemonService";
import { Favorite, Pokemon } from "../../../shared/types";
import { FetchPokemonsParams } from "../types/api-types";

const fetchPokemons = async ({
  page,
}: FetchPokemonsParams): Promise<Pokemon[]> => {
  return pokemonService.fetchPokemons({ page });
};

const fetchFavorites = async (): Promise<Favorite[]> => {
  return pokemonService.fetchFavorites();
};

const addFavorite = async (pokemonId: number) => {
  return pokemonService.addFavorite(pokemonId);
};

const deleteFavorite = async (pokemonId: number) => {
  return await pokemonService.deleteFavorite(pokemonId);
};

export const pokemonController = {
  addFavorite,
  fetchPokemons,
  fetchFavorites,
  deleteFavorite,
};
