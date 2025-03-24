export interface Pokemon {
  id: number;
  name: string;
  // Add more properties as needed
}

export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}
