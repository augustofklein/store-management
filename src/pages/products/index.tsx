import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import Product from "../../../model/Product/type";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import ProductModal from "@/components/ProductModal";

export default function Products() {

    const [products, setProducts] = useState<Product[]>();
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('store-management-auth')}`,
                },
            });
        
            if(!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data: Product[] = await response.json();
            setProducts(data);
        } catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleReloadProducts = async () => {
        await fetchProducts();
    };

    const handleEdit = async (productId: string, productDescription: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product${productId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('store-management-auth')}`,
                },
                body: JSON.stringify({ productDescription }),
            });
    
            if (!response.ok) {
                console.error('Failed to delete product');
            } else {
                handleReloadProducts();
            }
        } catch (error) {
            console.error('An error occurred while deleting the product:', error);
        }
    };
    
    const handleDelete = async (productId: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/v1/product/${productId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('store-management-auth')}`,
                },
            });
    
            if (!response.ok) {
                console.error('Failed to delete product');
            } else {
                handleReloadProducts();
            }
        } catch (error) {
            console.error('An error occurred while deleting the product:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }
  
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
                            <ProductCard key={product.id} product={product} handleDelete={handleDelete} handleEdit={handleEdit} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
                <ProductModal openModal={isModalOpen} closeModal={closeModal} handleSubmit={handleReloadProducts}/>
            </div>
        </Layout>
    )
}
