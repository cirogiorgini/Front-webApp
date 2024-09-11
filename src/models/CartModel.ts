import { Product } from "./Product.model";

export interface Cart {
    _id: string;
    products: CartProduct[];
}

export interface CartProduct {
    product: Product;
    quantity: number;
    _id: string;
}

