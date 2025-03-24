import apiClient from "../apiClient";
import { Pokemon } from "../../../shared/types";

export const getAllPokemons = async (): Promise<Pokemon[]> => {
  const response = await apiClient.get("/pokemons");
  return response.data;
};
