import { PageInfo } from "../general/type";

export interface Product {
  id: string;
  number: string;
  skuId: string;
  status: boolean;
  barcode: string;
  description: string;
  stock: number;
  price: number;
}

export interface ProductsResponse extends PageInfo {
  items: Product[];
}

export interface EditProductModel {
  id: string;
  skuId: string;
  description: string;
  status: boolean;
  price: number;
}

export interface AddProductModel {
  skuId: string;
  status: boolean;
  barcode: string;
  description: string;
  stock: number;
  price: number;
}
