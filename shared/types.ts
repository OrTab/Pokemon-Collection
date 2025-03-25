import { PokemonSprites } from "../backend/types/types";

export interface Pokemon {
  name: string;
  sprites: PokemonSprites;
  abilities: string[];
  types: string[];
  evolutions: string[];
  id: number;
}

export interface Favorite {
  _id: string;
  pokemonId: number;
  createdAt: string;
}
