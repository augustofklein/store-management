import { useState } from "react";
import { EditProductModel, Product } from "../../../model/product/type";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { CheckIconFA, EditIconFA } from "@/components/Icons/IconsFA";

interface EditProductInterface {
  productData: Product;
  editProductModal: boolean;
  setEditProductModal: () => void;
  handleSubmit: (form: EditProductModel) => void;
}

const EditProduct: React.FC<EditProductInterface> = ({
  productData,
  editProductModal,
  setEditProductModal,
  handleSubmit,
}) => {
  const [formData, setFormData] = useState<EditProductModel>({
    id: productData.id,
    skuId: productData.skuId,
    description: productData.description,
    status: productData.status,
    price: productData.price,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]:
            type === "checkbox"
              ? checked
              : type === "number"
                ? Number(value)
                : value,
        }) as EditProductModel,
    );
  };

  if (!editProductModal) return null;

  return (
    <Modal
      open={editProductModal}
      onClose={setEditProductModal}
      disableBackdropClick={false}
    >
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
          Edit Product
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({
              id: formData.id,
              skuId: formData.skuId,
              description: formData.description,
              status: formData.status,
              price: formData.price,
            });
          }}
        >
          <div className="mb-2">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skud ID
            </label>
            <input
              id="skuId"
              type="text"
              name="skuId"
              placeholder="SKU ID"
              value={formData.skuId}
              readOnly
              className="px-3 py-2 border rounded w-full bg-gray-200"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="status"
                type="checkbox"
                name="status"
                checked={!!formData.status}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="status" className="text-sm">
                Active
              </label>
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Price"
              value={String(formData.price)}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full"
            />
          </div>

          <div className="items-center px-4 py-3 space-y-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              icon={<CheckIconFA />}
            >
              Edit Product
            </Button>
            <Button
              type="button"
              variant="muted"
              className="w-full"
              onClick={setEditProductModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProduct;
