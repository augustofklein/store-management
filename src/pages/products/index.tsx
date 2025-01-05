import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import ProductModal from "@/components/ProductModal";
import { Product } from "../../../model/Product/type";
import { useProductService } from "../../../domains/product";

const Products: React.FC = () => {

    const [products, setProducts] = useState<Product[]>();
    const [addProductModal, setAddProductModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);

    const { executeGetProducts, executeAddProduct, executeDeleteProduct, executeEditProduct } = useProductService();

    const handleAddProductModal = useCallback(() => {
        setAddProductModal(current => !current);
    }, []);

    const handleEditProductModal = useCallback(() => {
        setEditProductModal(current => !current);
    }, []);

    const handleGetProducts = useCallback(async () => {
        const productsData = await executeGetProducts();
        setProducts(productsData);
    }, [executeGetProducts])

    const handleAddProduct = useCallback(async (form: Product) => {
        handleAddProductModal();
        await executeAddProduct(form);
        handleGetProducts();
    }, [executeAddProduct, handleAddProductModal, handleGetProducts])

    const handleEditProduct = useCallback(async (id: string, description: string) => {
        await executeEditProduct({id, description});
        handleGetProducts();
    }, [executeEditProduct, handleGetProducts])

    const handleDeleteProduct = useCallback(async (id: string) => {
        await executeDeleteProduct(id);
        handleGetProducts();
    }, [executeDeleteProduct, handleGetProducts])

    useEffect(() => {
        handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    return (
        <Layout title="Products" subtitle="Aqui você irá gerenciar os seus produtos!">
            <div>
                <button className={`
                    bg-blue-500 hover:bg-blue-400
                    text-white rounded-lg px-4 py-3
                `} onClick={handleAddProductModal}>
                    Add Product
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {products ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} handleDelete={handleDeleteProduct} handleEdit={handleEditProduct} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
                <ProductModal productModal={addProductModal} setAddProductModal={handleAddProductModal} handleSubmit={handleAddProduct}/>
            </div>
        </Layout>
    )
}
export default Products;