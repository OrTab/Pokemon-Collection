import { useSelector } from "react-redux";
import {
  selectFilteredPokemons,
  selectPokemonLoading,
  selectPokemonError,
} from "../store/pokemon/selectors";
import { useLoadAppData } from "./useLoadAppData";

export const usePokemons = () => {
  const pokemons = useSelector(selectFilteredPokemons);
  const loading = useSelector(selectPokemonLoading);
  const error = useSelector(selectPokemonError);

  useLoadAppData();

  return {
    pokemons,
    loading,
    error,
    isEmpty: pokemons.length === 0,
    isInitialLoading: loading && pokemons.length === 0,
  };
};
