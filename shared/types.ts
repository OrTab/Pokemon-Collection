import { PokemonSprites } from "../backend/types/types";

export interface Pokemon {
  name: string;
  sprites: PokemonSprites;
  abilities: string[];
  types: string[];
  evolution: string[];
  id: number;
}
