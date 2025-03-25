import { pokemonController } from "./../../controllers/pokemonController";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PokemonState } from "./types";

import { Favorite, Pokemon } from "../../../../shared/types";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../index";

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
    dispatch(pokemonSlice.actions.addFavoriteOptimistic(pokemonId));
    try {
      return await pokemonController.addFavorite(pokemonId);
    } catch (error) {
      dispatch(pokemonSlice.actions.removeFavoriteOptimistic(pokemonId));
      throw error;
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  "pokemon/deleteFavorite",
  async (pokemonId: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const currentFavorite = state.pokemon.favorites[pokemonId];

    dispatch(pokemonSlice.actions.removeFavoriteOptimistic(pokemonId));
    try {
      return await pokemonController.deleteFavorite(pokemonId);
    } catch (error) {
      if (currentFavorite) {
        dispatch(
          pokemonSlice.actions.restoreFavoriteOptimistic(currentFavorite)
        );
      }
      throw error;
    }
  }
);

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMoreToFetch: true,
  favorites: {},
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    addFavoriteOptimistic: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      state.favorites[pokemonId] = {
        _id: "temp-" + Date.now(), // Temporary ID
        pokemonId: pokemonId,
        createdAt: new Date().toISOString(),
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
      state.favorites[favorite.pokemonId] = favorite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<Pokemon[]>) => {
          state.loading = false;
          state.pokemons = [...state.pokemons, ...action.payload];
          state.hasMoreToFetch = action.payload.length > 0;
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pokemons";
      })
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<Favorite[]>) => {
          state.favorites = action.payload.reduce((acc, favorite) => {
            acc[favorite.pokemonId] = favorite;
            return acc;
          }, {} as Record<string, Favorite>);
        }
      )
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
  },
});

// Actions

export const {
  setCurrentPage,
  addFavoriteOptimistic,
  removeFavoriteOptimistic,
  restoreFavoriteOptimistic,
} = pokemonSlice.actions;

// Reducer

export default pokemonSlice.reducer;

// Listeners

export const pageListenerMiddleware = createListenerMiddleware();

pageListenerMiddleware.startListening({
  actionCreator: setCurrentPage,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchPokemons());
  },
});
