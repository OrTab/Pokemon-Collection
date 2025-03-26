export interface Pokemon {
  name: string;
  sprites: string[];
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
