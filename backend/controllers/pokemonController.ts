import { Request, Response } from "express";
import { fetchPokemons } from "../services/pokemonService";

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
