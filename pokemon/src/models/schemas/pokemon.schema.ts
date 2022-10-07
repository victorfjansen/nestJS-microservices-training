import mongoose from 'mongoose';

export const PokemonSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    element: String,
    age: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true, collection: 'pokemon' },
);
