import { Product, EditProductModel } from "../../model/Product/type";
import { executeProcessAddProduct, executeProcessDeleteProduct, executeProcessEditProduct, executeProcessGetProducts } from "./service/product";

export const useProductService = () => {
    const executeGetProducts = async (): Promise<Product[]> => {
      return await executeProcessGetProducts();
    };

    const executeAddProduct = async (form: Product) => {
      return await executeProcessAddProduct(form);
    }

    const executeEditProduct = async (form: EditProductModel) => {
      return await executeProcessEditProduct(form);
    }

    const executeDeleteProduct = async (id: string): Promise<void> => {
      return await executeProcessDeleteProduct(id);
    }
  
    return {
      executeGetProducts,
      executeAddProduct,
      executeEditProduct,
      executeDeleteProduct
    };
  };