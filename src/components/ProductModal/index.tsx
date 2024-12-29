import { useState } from "react";
import Product from "../../../model/Product/type";

interface ProductModalProps {
    openModal: boolean;
    closeModal: () => void;
    handleSubmit: () => void;
}

export default function ProductModal(props: ProductModalProps) {

    const [formData, setFormData] = useState<Product>({id: '', description: '', stock: 0});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await fetch(`${process.env.PUBLIC_URL_BACKEND_API}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    
        if (response.ok) {
            props.closeModal();
            props.handleSubmit();
        } else {
            console.error('Failed to add product');
        }
    };

    if (!props.openModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Product</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                            <input
                                type="text"
                                name="id"
                                placeholder="ID"
                                value={formData.id}
                                onChange={handleChange}
                                className="px-3 py-2 border rounded w-full"
                            />
                            </div>
                            <div className="mb-2">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="px-3 py-2 border rounded w-full"
                            />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="Stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="px-3 py-2 border rounded w-full"
                                />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600"
                                >
                                    Add Product
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 mt-2"
                                    onClick={props.closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}