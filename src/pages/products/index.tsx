import React, { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ConfirmDelete from "@/components/ConfirmDelete";
import { Product } from "../../../model/Product/type";
import { useProductService } from "../../../domains/product";
import ProductSkeleton from "@/components/Skeleton/Product";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    executeGetProducts,
    executeAddProduct,
    executeDeleteProduct,
    executeEditProduct,
  } = useProductService();

  const handleAddProductModal = useCallback(() => {
    setAddProductModal((current) => !current);
  }, []);

  const handleOpenConfirmDelete = useCallback((product: Product) => {
    setProductToDelete(product);
    setConfirmDeleteOpen(true);
  }, []);

  const handleCancelConfirmDelete = useCallback(() => {
    setProductToDelete(null);
    setConfirmDeleteOpen(false);
  }, []);

  const handleGetProducts = useCallback(async () => {
    try {
      setLoading(true);
      const productsData = await executeGetProducts();
      setProducts(productsData);
      console.log(products);
    } catch {
      //TODO: Adicionar tratamento de erro
    } finally {
      setLoading(false);
    }
  }, [executeGetProducts]);

  const handleAddProduct = useCallback(
    async (form: Product) => {
      handleAddProductModal();
      await executeAddProduct(form);
      handleGetProducts();
    },
    [executeAddProduct, handleAddProductModal, handleGetProducts],
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      await executeDeleteProduct(id);
      handleGetProducts();
    },
    [executeDeleteProduct, handleGetProducts],
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!productToDelete) return;
    try {
      setConfirmLoading(true);
      await handleDeleteProduct(productToDelete.id);
    } finally {
      setConfirmLoading(false);
      setProductToDelete(null);
      setConfirmDeleteOpen(false);
    }
  }, [productToDelete, handleDeleteProduct]);

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <Layout title="Products" subtitle="Here you can manage the products!">
      <div className="mb-4">
        <button
          onClick={handleAddProductModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left hidden sm:table-cell">
                  SKU ID
                </th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left hidden md:table-cell">
                  Barcode
                </th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Stock</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="py-3 px-6 text-left hidden sm:table-cell">
                    {product.skuId}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        product.status
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left hidden md:table-cell">
                    {product.barcode}
                  </td>
                  <td className="py-3 px-6 text-left">{product.description}</td>
                  <td className="py-3 px-6 text-left">{product.stock}</td>
                  <td className="py-3 px-6 text-left">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => {}}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenConfirmDelete(product)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfirmDelete
        open={confirmDeleteOpen}
        title="Delete product"
        message={
          productToDelete
            ? `Delete "${productToDelete.description}"? This action cannot be undone.`
            : undefined
        }
        onCancel={handleCancelConfirmDelete}
        onConfirm={handleConfirmDelete}
        loading={confirmLoading}
      />
    </Layout>
  );
};
export default Products;
