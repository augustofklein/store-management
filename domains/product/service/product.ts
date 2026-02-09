import { EditProductModel, Product } from "../../../model/product/type";
import { apiFetch } from "@/utils/apiClient";

export const executeProcessGetProducts = async (): Promise<Product[]> => {
  return await apiFetch<Product[]>("/v1/product");
};

export const executeProcessAddProduct = async (
  form: Product,
): Promise<void> => {
  await apiFetch<void>(
    "/v1/product",
    {
      method: "POST",
      body: JSON.stringify(form),
    },
    false,
  );
};

export const executeProcessEditProduct = async (
  form: EditProductModel,
): Promise<void> => {
  await apiFetch<void>(
    `/v1/product/${form.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ ...form }),
    },
    false,
  );
};

export const executeProcessDeleteProduct = async (
  id: string,
): Promise<void> => {
  await apiFetch<void>(
    `/v1/product/${id}`,
    {
      method: "DELETE",
    },
    false,
  );
};
