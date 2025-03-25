import { Pokemon } from "./../../shared/types";
import axios, { AxiosResponse } from "axios";
import {
  PokemonAbility,
  PokemonType,
  FetchedPokemon,
  PokemonSpecies,
} from "../types/types";
import { extractEvolutionNames, getAllSettledValues } from "../utils";
import Favorite from "../models/Favorite";

const fetchPokemons = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    // fetch all pokemons
    const pokemonsResponse: Promise<AxiosResponse<FetchedPokemon>>[] =
      response.data.results.map((pokemon: any) => axios.get(pokemon.url));

    const {
      fulfilledResults: allPokemons,
      rejectedResults: allPokemonsRejected,
    } = await getAllSettledValues(pokemonsResponse);

    if (allPokemonsRejected.length > 0) {
      console.error("Failed to fetch pokemon data:", allPokemonsRejected);
    }

    const fetchedPokemons = allPokemons.map((pokemon) => pokemon.data);

    // process the pokemons
    const processedPokemons = fetchedPokemons.map(async (pokemon) => {
      const evolutions = await fetchPokemonEvolutions(pokemon.species.url);
      return {
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
        abilities: pokemon.abilities.map(
          (ability: PokemonAbility) => ability.ability.name
        ),
        types: pokemon.types.map((type: PokemonType) => type.type.name),
        evolutions,
      };
    });

    // get all settled values
    const {
      fulfilledResults: pokemons,
      rejectedResults: rejectedProcessedPokemons,
    } = await getAllSettledValues(processedPokemons);

    // if there are any rejected values, log the error
    if (rejectedProcessedPokemons.length > 0) {
      console.error(
        "Failed to process pokemon data:",
        rejectedProcessedPokemons
      );
    }

    return pokemons;
  } catch (error) {
    throw error;
  }
};

const fetchPokemonEvolutions = async (url: string) => {
  const response = await axios.get(url);
  const evolution: PokemonSpecies = response.data;

  const evolutionChainResponse = await axios.get(evolution.evolution_chain.url);
  const evolutionChainData = evolutionChainResponse.data;
  // extract the evolution name recursively
  return extractEvolutionNames(evolutionChainData.chain);
};

const addFavorite = async (pokemonId: string) => {
  return Favorite.create({
    pokemonId,
  });
};

const getFavorites = async () => {
  return Favorite.find();
};

const deleteFavorite = async (pokemonId: number) => {
  return Favorite.findOneAndDelete({ pokemonId });
};

export const pokemonService = {
  fetchPokemons,
  addFavorite,
  getFavorites,
  deleteFavorite,
};
