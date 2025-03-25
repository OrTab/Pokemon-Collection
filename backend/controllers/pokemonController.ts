import { Request, Response } from "express";
import { pokemonService } from "../services/pokemonService";

const PAGE_LIMIT = 20;

const fetchPokemons = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pokemons = await pokemonService.fetchPokemons({
      offset: (page - 1) * PAGE_LIMIT,
      limit: PAGE_LIMIT,
    });
    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error in getPokemons:", error);
    res.status(500).json({ error: "Failed to fetch pokemons" });
  }
};

const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await pokemonService.getFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error in getFavoritesPokemons:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

const addFavorite = async (req: Request, res: Response) => {
  const { pokemonId } = req.body;
  if (!pokemonId) {
    res.status(400).json({ error: "Pokemon ID is required" });
    return;
  }
  try {
    const favorite = await pokemonService.addFavorite(pokemonId);
    res.status(200).json(favorite);
  } catch (error) {
    console.error("Error in addFavorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  const { pokemonId } = req.params;
  if (!pokemonId) {
    res.status(400).json({ error: "Pokemon ID is required" });
    return;
  }
  try {
    await pokemonService.deleteFavorite(parseInt(pokemonId));
    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteFavoritePokemon:", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
};

export const pokemonController = {
  fetchPokemons,
  getFavorites,
  addFavorite,
  deleteFavorite,
};
