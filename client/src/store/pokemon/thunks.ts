import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonController } from "../../controllers/pokemonController";
import { RootState } from "../index";
import {
  addFavoriteOptimistic,
  removeFavoriteOptimistic,
  restoreFavoriteOptimistic,
} from "./slice";
import { Favorite } from "../../../../shared/types";
import { PokemonState } from "./types";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  (_, { getState }) => {
    const state = getState() as RootState;
    const currentPage = state.pokemon.currentPage;
    return pokemonController.fetchPokemons({ page: currentPage });
  }
);

export const fetchFavorites = createAsyncThunk(
  "pokemon/fetchFavorites",
  pokemonController.fetchFavorites
);

export const addFavorite = createAsyncThunk(
  "pokemon/addFavorite",
  async (pokemonId: number, { dispatch }) => {
    dispatch(addFavoriteOptimistic(pokemonId));
    try {
      return await pokemonController.addFavorite(pokemonId);
    } catch (error) {
      dispatch(removeFavoriteOptimistic(pokemonId));
      throw error;
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "pokemon/deleteFavorite",
  async (pokemonId: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const currentFavorite = state.pokemon.favorites[pokemonId];

    dispatch(removeFavoriteOptimistic(pokemonId));
    try {
      return await pokemonController.deleteFavorite(pokemonId);
    } catch (error) {
      if (currentFavorite) {
        dispatch(restoreFavoriteOptimistic(currentFavorite));
      }
      throw error;
    }
  }
);

export const addExtraReducers = (
  builder: ActionReducerMapBuilder<PokemonState>
) => {
  builder
    .addCase(fetchPokemons.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchPokemons.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemons = [...state.pokemons, ...action.payload];
      state.hasMoreToFetch = action.payload.length > 0;
    })
    .addCase(fetchPokemons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch pokemons";
    })
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload.reduce((acc, favorite) => {
        acc[favorite.pokemonId] = favorite;
        return acc;
      }, {} as Record<string, Favorite>);
    })
    .addCase(addFavorite.fulfilled, (state, action) => {
      state.favorites = {
        ...state.favorites,
        [action.payload.pokemonId]: action.payload,
      };
    })
    .addCase(deleteFavorite.fulfilled, (state, action) => {
      const pokemonId = action.meta.arg;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [pokemonId]: _, ...rest } = state.favorites;
      state.favorites = rest;
    });
};
