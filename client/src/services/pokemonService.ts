import apiClient from "../apiClient";
import { Favorite, Pokemon } from "../../../shared/types";
import { FetchPokemonsParams } from "../types/api-types";

const fetchPokemons = async ({
  page,
}: FetchPokemonsParams): Promise<Pokemon[]> => {
  const response = await apiClient.get("/pokemons", {
    params: { page },
  });
  return response.data;
};

const fetchFavorites = async (): Promise<Favorite[]> => {
  const response = await apiClient.get("/pokemons/favorites");
  return response.data;
};

const addFavorite = async (pokemonId: number) => {
  const response = await apiClient.post("/pokemons/favorites", {
    pokemonId,
  });
  return response.data;
};

const deleteFavorite = async (pokemonId: number) => {
  const response = await apiClient.delete(`/pokemons/favorites/${pokemonId}`);
  return response.data;
};

export const pokemonService = {
  fetchPokemons,
  fetchFavorites,
  addFavorite,
  deleteFavorite,
};
