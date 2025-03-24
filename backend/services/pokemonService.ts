import { Pokemon } from "./../../shared/types";
import axios, { AxiosResponse } from "axios";
import {
  PokemonAbility,
  PokemonType,
  FetchedPokemon,
  PokemonSpecies,
} from "../types/types";
import { extractEvolutionName, getAllSettledValues } from "../utils";

export const fetchPokemons = async ({
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
      const evolution = await fetchPokemonEvolution(pokemon.species.url);
      return {
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
        abilities: pokemon.abilities.map(
          (ability: PokemonAbility) => ability.ability.name
        ),
        types: pokemon.types.map((type: PokemonType) => type.type.name),
        evolution,
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

const fetchPokemonEvolution = async (url: string) => {
  const response = await axios.get(url);
  const evolution: PokemonSpecies = response.data;

  const evolutionChainResponse = await axios.get(evolution.evolution_chain.url);
  const evolutionChainData = evolutionChainResponse.data;
  // extract the evolution name recursively
  return extractEvolutionName(evolutionChainData.chain);
};
