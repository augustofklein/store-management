export interface Product {
    id: string;
    barcode: string;
    description: string;
    stock: number;
}

export interface EditProductModel {
    id: string;
    description: string;
}