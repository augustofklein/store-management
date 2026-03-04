import { useEffect, useState } from "react";
import { AddProductModel } from "../../../model/product/type";
import { CheckIconFA } from "../Icons/IconsFA";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface AddProductModalProps {
  addProductModal: boolean;
  setAddProductModal: () => void;
  handleSubmit: (form: AddProductModel) => void;
  processLoading: boolean;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  addProductModal,
  setAddProductModal,
  handleSubmit,
  processLoading,
}) => {
  const initialFormData: AddProductModel = {
    skuId: "",
    status: true,
    barcode: "",
    description: "",
    stock: 0,
    price: 0,
  };

  const [formData, setFormData] = useState<AddProductModel>(initialFormData);

  useEffect(() => {
    if (addProductModal) {
      setFormData(initialFormData);
    }
  }, [addProductModal, initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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
        }) as AddProductModel,
    );
  };

  return (
    <Modal
      open={addProductModal}
      onClose={setAddProductModal}
      title="Add product"
    >
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
        >
          <div className="mb-2">
            <label
              htmlFor="skuId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              SKU ID
            </label>
            <input
              id="skuId"
              type="text"
              name="skuId"
              placeholder="SKU ID"
              value={formData.skuId}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="barcode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Barcode
            </label>
            <input
              id="barcode"
              type="text"
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full"
              required
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
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              placeholder="Stock"
              value={String(formData.stock)}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full"
              min={0}
              required
            />
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
              min={0}
              step="0.01"
              required
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

          <div className="items-center px-4 py-3 space-y-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              icon={<CheckIconFA />}
              loading={processLoading}
              disabled={processLoading}
            >
              Add Product
            </Button>
            <Button
              type="button"
              variant="muted"
              className="w-full"
              onClick={setAddProductModal}
              loading={processLoading}
              disabled={processLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddProductModal;
