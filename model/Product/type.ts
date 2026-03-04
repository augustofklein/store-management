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

export interface ProductsResponse {
  items: Product[];
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface EditProductModel {
  id: string;
  skuId: string;
  description: string;
  status: boolean;
  price: number;
}
