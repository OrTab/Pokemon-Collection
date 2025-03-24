import apiClient from "../apiClient";
import { Pokemon } from "../../../shared/types";
import { FetchPokemonsParams } from "../types/api-types";

export const fetchPokemons = async ({
  page,
}: FetchPokemonsParams): Promise<Pokemon[]> => {
  const response = await apiClient.get("/pokemons", {
    params: { page },
  });
  return response.data;
};
