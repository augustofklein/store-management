import { Product } from "../../../model/Product/type";

interface ProductProps {
    product: Product;
    handleEdit: (productId: string, productDescription: string) => void;
    handleDelete: (productId: string) => void;
}

const ProductCard: React.FC<ProductProps> = ({product, handleEdit, handleDelete}) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 mr-4">
            <img className="w-full" src="../../../images/no-image.png" alt="Product Image"/>
            <div className="px-6 py-4">
                <button onClick={() => handleEdit(product.id, product.description)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
                <div className="font-bold text-xl mb-2">ID: {product.id}</div>
                <div className="text-gray-700 text-xl mb-2">Description: {product.description}</div>
                <div className="text-gray-700 text-base">Stock: {product.stock}</div>
                <div className="mt-4 flex justify-between"/>
            </div>
        </div>
    );
}

export default ProductCard;