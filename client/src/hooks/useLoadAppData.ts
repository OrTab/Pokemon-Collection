import { useEffect } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { fetchPokemons, fetchFavorites } from "../store/pokemon/pokemonSlice";

export const useLoadAppData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(fetchFavorites());
  }, [dispatch]);
};
