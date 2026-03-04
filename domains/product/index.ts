import {
  Product,
  EditProductModel,
  ProductsResponse,
} from "../../model/product/type";
import {
  executeProcessAddProduct,
  executeProcessDeleteProduct,
  executeProcessEditProduct,
  executeProcessGetProducts,
} from "./service/product";

export const useProductService = () => {
  const executeGetProducts = async (
    page?: number,
    pageSize?: number,
  ): Promise<ProductsResponse> => {
    return await executeProcessGetProducts(page, pageSize);
  };

  const executeAddProduct = async (form: Product) => {
    return await executeProcessAddProduct(form);
  };

  const executeEditProduct = async (form: EditProductModel) => {
    return await executeProcessEditProduct(form);
  };

  const executeDeleteProduct = async (id: string): Promise<void> => {
    return await executeProcessDeleteProduct(id);
  };

  return {
    executeGetProducts,
    executeAddProduct,
    executeEditProduct,
    executeDeleteProduct,
  };
};
