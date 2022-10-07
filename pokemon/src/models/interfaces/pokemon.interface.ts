import { Document } from 'mongoose';

export interface Pokemon extends Document {
  name: string;
  element: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}
