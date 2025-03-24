import { Pokemon } from "../../../../shared/types";
export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}
