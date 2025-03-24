import apiClient from "../apiClient";
import { Pokemon } from "../store/pokemon/types";

export const getAllPokemons = async (): Promise<Pokemon[]> => {
  const response = await apiClient.get("/pokemons");
  return response.data;
};
