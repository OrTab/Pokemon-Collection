import { IconButton } from "@chakra-ui/react";
import { useCallback } from "react";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import {
  addFavorite,
  deleteFavorite,
  selectPokemonFavorites,
} from "../store/pokemon/pokemonSlice";

type FavoriteIconProps = {
  pokemonId: number;
  className?: string;
};

export const FavoriteIcon = ({ pokemonId, className }: FavoriteIconProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector(selectPokemonFavorites);
  const isFavorite = !!favorites[pokemonId];

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isFavorite) {
        dispatch(deleteFavorite(pokemonId));
      } else {
        dispatch(addFavorite(pokemonId));
      }
    },
    [isFavorite, dispatch, pokemonId]
  );

  return (
    <IconButton
      aria-label='Add to favorites'
      size='sm'
      onClick={handleFavorite}
      className={className}
      variant='ghost'
    >
      <FaHeart color={isFavorite ? "red" : "gray"} />
    </IconButton>
  );
};
