import mongoose, { Document, Schema } from "mongoose";
import { Favorite } from "../../shared/types";

export interface IFavorite extends Document, Omit<Favorite, "_id"> {}

const FavoriteSchema = new Schema(
  {
    pokemonId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model<IFavorite>("favorites", FavoriteSchema);
