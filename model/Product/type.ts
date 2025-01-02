export interface Product {
    id: string;
    barcode: string;
    description: string;
    stock: number;
}

export interface EditProduct {
    id: string;
    description: string;
}