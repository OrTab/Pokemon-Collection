import { pokemonController } from "./../../controllers/pokemonController";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
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
export const { setCurrentPage, setFilters } = pokemonSlice.actions;

// Selectors
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

// Listeners
export const pageListenerMiddleware = createListenerMiddleware();

pageListenerMiddleware.startListening({
  actionCreator: setCurrentPage,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(fetchPokemons());
  },
});

// Reducer
export default pokemonSlice.reducer;
