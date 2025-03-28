import { Request, Response } from "express";
import { pokemonService } from "../services/pokemonService";
import { getCache, setCache } from "../cache/redisUtils";
import { IFavorite } from "../models/Favorite";
import { CACHE_KEYS } from "../cache/constants";
import { logger } from "../utils/logger";
const PAGE_LIMIT = 24;

const fetchPokemons = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pokemons = await pokemonService.fetchPokemons({
      offset: (page - 1) * PAGE_LIMIT,
      limit: PAGE_LIMIT,
    });
    res.status(200).json(pokemons);
  } catch (error) {
    logger.error("Error in getPokemons:", { error });
    res.status(500).json({ error: "Failed to fetch pokemons" });
  }
};

const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await pokemonService.getFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    logger.error("Error in getFavoritesPokemons:", { error });
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
    const cachedFavorites = await getCache<IFavorite[]>(CACHE_KEYS.FAVORITES);
    if (cachedFavorites) {
      cachedFavorites.push(favorite);
      setCache({ key: CACHE_KEYS.FAVORITES, data: cachedFavorites });
    }
    res.status(200).json(favorite);
  } catch (error: any) {
    if (error.code === 11000) {
      logger.error("Pokemon is already in favorites:", { error });
      res.status(409).json({ error: "Pokemon is already in favorites" });
    } else {
      logger.error("Failed to add favorite:", { error });
      res.status(500).json({ error: "Failed to add favorite" });
    }
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
    const cachedFavorites = await getCache<IFavorite[]>(CACHE_KEYS.FAVORITES);
    if (cachedFavorites) {
      const filteredFavorites = cachedFavorites.filter(
        (favorite) => favorite.pokemonId !== parseInt(pokemonId)
      );
      setCache({ key: CACHE_KEYS.FAVORITES, data: filteredFavorites });
    }
    res.status(204).send();
  } catch (error) {
    logger.error("Error in deleteFavoritePokemon:", { error });
    res.status(500).json({ error: "Failed to delete favorite" });
  }
};

export const pokemonController = {
  fetchPokemons,
  getFavorites,
  addFavorite,
  deleteFavorite,
};
