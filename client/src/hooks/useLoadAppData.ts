import { useEffect } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { fetchFavorites, fetchPokemons } from "../store/pokemon/thunks";

export const useLoadAppData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(fetchFavorites());
  }, [dispatch]);
};
