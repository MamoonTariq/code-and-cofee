import { Document } from 'mongoose';
import { User } from './user';

export interface Product extends Document {
  owner: User;
  title: string;
  desc: string;
  image: string;
  price: string;
  created: Date;
}
