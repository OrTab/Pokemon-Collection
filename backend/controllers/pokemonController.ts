import { Request, Response } from "express";
import {
  addFavorite,
  deleteFavorite,
  fetchPokemons,
  getFavorites,
} from "../services/pokemonService";

const PAGE_LIMIT = 20;

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pokemons = await fetchPokemons({
      offset: (page - 1) * PAGE_LIMIT,
      limit: PAGE_LIMIT,
    });
    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error in getPokemons:", error);
    res.status(500).json({ error: "Failed to fetch pokemons" });
  }
};

export const getFavoritesPokemons = async (req: Request, res: Response) => {
  try {
    const favorites = await getFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error in getFavoritesPokemons:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

export const addFavoritePokemon = async (req: Request, res: Response) => {
  const { pokemonId } = req.body;
  if (!pokemonId) {
    res.status(400).json({ error: "Pokemon ID is required" });
    return;
  }
  try {
    const favorite = await addFavorite(pokemonId);
    res.status(200).json(favorite);
  } catch (error) {
    console.error("Error in addFavorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

export const deleteFavoritePokemon = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Favorite ID is required" });
    return;
  }
  try {
    await deleteFavorite(id);
    console.log("Favorite deleted:", id);
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteFavoritePokemon:", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
};
