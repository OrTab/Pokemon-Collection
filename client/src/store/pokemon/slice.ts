import { addExtraReducers } from "./thunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonState } from "./types";
import { Favorite } from "../../../../shared/types";

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMoreToFetch: true,
  favorites: {},
  filters: {
    showFavorites: false,
    search: "",
  },
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    setFilters: (
      state,
      action: PayloadAction<{ showFavorites: boolean; search: string }>
    ) => {
      state.filters = action.payload;
    },
    addFavoriteOptimistic: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      state.favorites = {
        ...state.favorites,
        [pokemonId]: {
          _id: "temp-" + Date.now(),
          pokemonId: pokemonId,
          createdAt: new Date().toISOString(),
        },
      };
    },
    removeFavoriteOptimistic: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [pokemonId]: _, ...rest } = state.favorites;
      state.favorites = rest;
    },
    restoreFavoriteOptimistic: (state, action: PayloadAction<Favorite>) => {
      const favorite = action.payload;
      state.favorites = {
        ...state.favorites,
        [favorite.pokemonId]: favorite,
      };
    },
  },
  extraReducers: addExtraReducers,
});

// Actions
export const {
  setCurrentPage,
  setFilters,
  addFavoriteOptimistic,
  removeFavoriteOptimistic,
  restoreFavoriteOptimistic,
} = pokemonSlice.actions;

export const pokemonReducer = pokemonSlice.reducer;
