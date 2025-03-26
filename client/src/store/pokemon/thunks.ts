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
import { addMessage } from "../message/slice";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const currentPage = state.pokemon.currentPage;
    try {
      return await pokemonController.fetchPokemons({ page: currentPage });
    } catch (error) {
      // we don't want to show the toast message if the user is on the first page
      if (currentPage > 1) {
        dispatch(
          addMessage({
            text: "Failed to fetch pokemons",
            type: "error",
          })
        );
      }
      throw error;
    }
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
      dispatch(
        addMessage({
          text: "Failed to add pokemon to favorites",
          type: "error",
        })
      );
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
        dispatch(
          addMessage({
            text: "Failed to remove pokemon from favorites",
            type: "error",
          })
        );
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
