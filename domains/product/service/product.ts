import {
  AddProductModel,
  EditProductModel,
  Product,
  ProductsResponse,
} from "../../../model/product/type";
import { apiFetch } from "@/utils/apiClient";

export const executeProcessGetProducts = async (
  page?: number,
  pageSize?: number,
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("pageNumber", String(page));
  if (pageSize !== undefined) params.append("pageSize", String(pageSize));
  const url = params.toString()
    ? `/v1/product?${params.toString()}`
    : "/v1/product";
  return await apiFetch<ProductsResponse>(url);
};

export const executeProcessAddProduct = async (
  form: AddProductModel,
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
