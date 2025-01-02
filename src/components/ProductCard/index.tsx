import { Product } from "../../../model/Product/type";

interface ProductProps {
    product: Product;
    handleEdit: (productId: string, productDescription: string) => void;
    handleDelete: (productId: string) => void;
}

export default function ProductCard(props: ProductProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 mr-4">
            <img className="w-full" src="../../../images/no-image.png" alt="Product Image"/>
            <div className="px-6 py-4">
                <button onClick={() => props.handleEdit(props.product.id, props.product.description)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
                <button onClick={() => props.handleDelete(props.product.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
                <div className="font-bold text-xl mb-2">ID: {props.product.id}</div>
                <div className="text-gray-700 text-xl mb-2">Description: {props.product.description}</div>
                <div className="text-gray-700 text-base">Stock: {props.product.stock}</div>
                <div className="mt-4 flex justify-between">
                </div>
            </div>
        </div>
    );
};