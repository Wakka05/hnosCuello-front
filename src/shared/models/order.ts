import { Product } from './product';

export class Order {
  _id?: string;
  product: Product;
  quantity: number;
  finalPrice: string;
}
