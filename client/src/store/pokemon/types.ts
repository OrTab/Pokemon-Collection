import { Favorite, Pokemon } from "../../../../shared/types";
export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMoreToFetch: boolean;
  favorites: Record<Favorite["pokemonId"], Favorite>;
}
