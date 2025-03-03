import { useCallback, useState } from "react";
import { EditProductModel, Product } from "../../../model/Product/type";
import { useProductService } from "../../../domains/product";
import EditProduct from "../EditProduct";

interface ProductProps {
    product: Product;
    handleDelete: (productId: string) => void;
    handleEdit: () => void;
}

const ProductCard: React.FC<ProductProps> = ({product, handleDelete, handleEdit}) => {
    const [editProductModal, setEditProductModal] = useState(false);

    const { executeEditProduct } = useProductService();

    const handleEditProductModal = useCallback(() => {
        setEditProductModal(current => !current);
    }, []);

    const handleEditProduct = useCallback(async (data: EditProductModel) => {
        handleEditProductModal();
        await executeEditProduct(data);
        handleEdit();
    }, [executeEditProduct, handleEdit, handleEditProductModal])
    
    return (
        <>
            <div className="max-w-xs rounded overflow-hidden shadow-lg mt-4 mr-4">
                <img className="w-full" src="../../../images/no-image.png" alt="Product Image"/>
                <div className="px-6 py-4">
                    <button onClick={() => handleEditProductModal()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                    <div className="font-bold text-xl mb-2">ID: {product.id}</div>
                    <div className="text-gray-700 text-xm mb-2">Barcode: {product.barcode}</div>
                    <div className="text-gray-700 text-xm mb-2">Description: {product.description}</div>
                    <div className="text-gray-700 text-base">Stock: {product.stock}</div>
                </div>
            </div>
            <EditProduct productData={product} editProductModal={editProductModal} setEditProductModal={handleEditProductModal} handleSubmit={handleEditProduct}/>
        </>
    );
}

export default ProductCard;