import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import ConfirmDelete from "@/components/ConfirmDelete";
import Button from "@/components/ui/Button";
import { EditIconFA, TrashIconFA } from "@/components/Icons/IconsFA";
import {
  Product,
  EditProductModel,
  AddProductModel,
} from "../../../model/product/type";
import { useProductService } from "../../../domains/product";
import ProductSkeleton from "@/components/Skeleton/Product";
import EditProduct from "@/components/EditProduct";
import { useToastMessageService } from "../../../domains/error-message";
import { ToastContainer } from "react-toastify";
import { returnErrorMessage } from "@/utils/apiClient";
import AddProductModal from "@/components/AddProductModal";
import Table, {
  TableBooleanBadge,
  TableColumnCell,
  TableColumnHeader,
  TableRow,
} from "@/components/Table";
import { TABLE_PAGE_SIZE } from "@/constants";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  const [editProductModal, setEditProductModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const didLoadProducts = useRef(false);
  const { showErrorMessage } = useToastMessageService();

  const {
    executeGetProducts,
    executeAddProduct,
    executeDeleteProduct,
    executeEditProduct,
  } = useProductService();

  const handleOpenConfirmDelete = useCallback((product: Product) => {
    setProductToDelete(product);
    setConfirmDeleteOpen((prev) => !prev);
  }, []);

  const handleCancelConfirmDelete = useCallback(() => {
    setProductToDelete(null);
    setConfirmDeleteOpen((prev) => !prev);
  }, []);

  const handleEditProductModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setEditProductModal((prev) => !prev);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setSelectedProduct(null);
    setEditProductModal((prev) => !prev);
  }, []);

  const handleOpenAddProductModal = useCallback(() => {
    setAddProductModal((prev) => !prev);
  }, []);

  const handleGetProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await executeGetProducts(page, TABLE_PAGE_SIZE);
      const items = res?.items ?? [];
      const totalPagesFromRes =
        res?.totalPages ??
        Math.max(1, Math.ceil((res?.totalCount ?? 0) / TABLE_PAGE_SIZE));

      // If server returned a different current page, sync it
      if (res?.pageNumber && res.pageNumber !== page) {
        setPage(res.pageNumber);
      }

      if (items.length === 0 && page > 1) {
        setPage(page - 1);
        return res;
      }

      setProducts(items);
      setTotalPages(Math.max(1, totalPagesFromRes));
      return res;
    } catch (error) {
      showErrorMessage(returnErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [executeGetProducts, showErrorMessage, page]);

  const handleConfirmDelete = useCallback(async () => {
    if (!productToDelete) return;

    try {
      setConfirmLoading(true);
      await executeDeleteProduct(productToDelete.id);
      setConfirmDeleteOpen(false);
      handleGetProducts();
    } catch (error) {
      showErrorMessage(returnErrorMessage(error));
    } finally {
      setConfirmLoading(false);
      setProductToDelete(null);
    }
  }, [
    productToDelete,
    handleGetProducts,
    executeDeleteProduct,
    showErrorMessage,
  ]);

  const handleEditProduct = useCallback(
    async (form: EditProductModel) => {
      try {
        setConfirmLoading(true);
        await executeEditProduct(form);
        handleCloseEditModal();
        handleGetProducts();
      } catch (error) {
        showErrorMessage(returnErrorMessage(error));
      } finally {
        setConfirmLoading(false);
      }
    },
    [
      executeEditProduct,
      handleCloseEditModal,
      handleGetProducts,
      showErrorMessage,
    ],
  );

  const handleAddProduct = useCallback(
    async (form: AddProductModel) => {
      try {
        setConfirmLoading(true);
        await executeAddProduct(form);
        handleOpenAddProductModal();
        handleGetProducts();
      } catch (error) {
        showErrorMessage(returnErrorMessage(error));
      } finally {
        setConfirmLoading(false);
      }
    },
    [
      executeAddProduct,
      handleGetProducts,
      handleOpenAddProductModal,
      showErrorMessage,
    ],
  );

  useEffect(() => {
    if (didLoadProducts.current) return;
    didLoadProducts.current = true;
    handleGetProducts();
  }, [handleGetProducts]);

  return (
    <Layout title="Products" subtitle="Here you can manage the products!">
      <ToastContainer />
      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <Button
            variant="primary"
            onClick={() => handleOpenAddProductModal()}
            className="mb-4"
          >
            + Add Product
          </Button>
          <Table
            wrapperClassName=""
            headers={
              <>
                <TableColumnHeader className="hidden sm:table-cell">
                  SKU ID
                </TableColumnHeader>
                <TableColumnHeader>Status</TableColumnHeader>
                <TableColumnHeader className="hidden md:table-cell">
                  Barcode
                </TableColumnHeader>
                <TableColumnHeader>Description</TableColumnHeader>
                <TableColumnHeader>Stock</TableColumnHeader>
                <TableColumnHeader>Price</TableColumnHeader>
                <TableColumnHeader className="text-center">
                  Actions
                </TableColumnHeader>
              </>
            }
            body={products?.map((product) => (
              <TableRow key={product.id}>
                <TableColumnCell className="hidden sm:table-cell">
                  {product.skuId}
                </TableColumnCell>
                <TableColumnCell>
                  <TableBooleanBadge value={product.status} />
                </TableColumnCell>
                <TableColumnCell className="hidden md:table-cell">
                  {product.barcode}
                </TableColumnCell>
                <TableColumnCell>{product.description}</TableColumnCell>
                <TableColumnCell>{product.stock}</TableColumnCell>
                <TableColumnCell>${product.price.toFixed(2)}</TableColumnCell>
                <TableColumnCell className="text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <Button
                      variant="primary"
                      onClick={() => handleEditProductModal(product)}
                      icon={<EditIconFA />}
                      className="w-full sm:w-auto py-1 px-2"
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleOpenConfirmDelete(product)}
                      icon={<TrashIconFA />}
                      className="w-full sm:w-auto py-1 px-2"
                    />
                  </div>
                </TableColumnCell>
              </TableRow>
            ))}
            footer={
              <tr>
                <td colSpan={7} className="py-3 px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                      Page {page} of {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="muted"
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                      >
                        {"<<"}
                      </Button>
                      <Button
                        variant="muted"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        {"<"}
                      </Button>
                      <Button
                        variant="muted"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page >= totalPages}
                      >
                        {">"}
                      </Button>
                      <Button
                        variant="muted"
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                      >
                        {">>"}
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            }
          />
        </div>
      )}
      <AddProductModal
        addProductModal={addProductModal}
        setAddProductModal={handleOpenAddProductModal}
        handleSubmit={handleAddProduct}
        processLoading={confirmLoading}
      />
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
      {selectedProduct && (
        <EditProduct
          productData={selectedProduct}
          editProductModal={editProductModal}
          setEditProductModal={handleCloseEditModal}
          handleSubmit={handleEditProduct}
          processLoading={confirmLoading}
        />
      )}
    </Layout>
  );
};
export default Products;
