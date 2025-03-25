import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const selectPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectPokemonFilters = (state: RootState) => state.pokemon.filters;
export const selectPokemonFavorites = (state: RootState) =>
  state.pokemon.favorites;
export const selectPokemonLoading = (state: RootState) => state.pokemon.loading;
export const selectPokemonError = (state: RootState) => state.pokemon.error;
export const selectPokemonCurrentPage = (state: RootState) =>
  state.pokemon.currentPage;
export const selectPokemonHasMoreToFetch = (state: RootState) =>
  state.pokemon.hasMoreToFetch;

export const selectFilteredPokemons = createSelector(
  [selectPokemons, selectPokemonFilters, selectPokemonFavorites],
  (pokemons, filters, favorites) => {
    return pokemons.filter((pokemon) => {
      const isFavorite = favorites[pokemon.id] !== undefined;
      const isSearchMatch = pokemon.name
        .toLowerCase()
        .startsWith(filters.search.toLowerCase());
      return filters.showFavorites
        ? isFavorite && isSearchMatch
        : isSearchMatch;
    });
  }
);
