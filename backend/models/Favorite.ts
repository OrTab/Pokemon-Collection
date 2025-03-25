import mongoose, { Document, Schema } from "mongoose";
import { Favorite } from "../../shared/types";

export interface IFavorite extends Document, Omit<Favorite, "_id"> {}

const FavoriteSchema = new Schema(
  {
    pokemonId: {
      type: Number,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

// Compound index to prevent duplicate favorites for the same user
FavoriteSchema.index({ userId: 1, pokemonId: 1 }, { unique: true });

export default mongoose.model<IFavorite>("favorites", FavoriteSchema);
