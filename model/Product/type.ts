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

export interface EditProductModel {
  id: string;
  description: string;
}
