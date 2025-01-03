import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import ProductModal from "@/components/ProductModal";
import { Product } from "../../../model/Product/type";
import { useProductService } from "../../../domains/product";

export default function Products() {

    const [products, setProducts] = useState<Product[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { executeGetProducts, executeDeleteProduct, executeEditProduct } = useProductService();

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleGetProducts = useCallback(async () => {
        const productsData = await executeGetProducts();
        setProducts(productsData);
    }, [executeGetProducts])

    const handleEditProduct = useCallback(async (id: string, description: string) => {
        await executeEditProduct({id, description});
    }, [executeEditProduct])

    const handleDeleteProduct = useCallback(async (id: string) => {
        await executeDeleteProduct(id);
    }, [executeDeleteProduct])

    useEffect(() => {
        handleGetProducts();
    }, [handleGetProducts])
  
    return (
        <Layout title="Products" subtitle="Aqui você irá gerenciar os seus produtos!">
            <div>
                <button className={`
                    bg-blue-500 hover:bg-blue-400
                    text-white rounded-lg px-4 py-3
                `} onClick={openModal}>
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
                <ProductModal openModal={isModalOpen} closeModal={closeModal} handleSubmit={handleGetProducts}/>
            </div>
        </Layout>
    )
}
