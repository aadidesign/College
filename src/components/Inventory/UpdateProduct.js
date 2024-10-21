import { useState } from "react";

const UpdateProduct = ({ product, onSave, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    onSave(updatedProduct);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Update Product</h2>
        <div className="flex flex-col gap-4">
          <input
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
          />
          <input
            name="manufacturer"
            value={updatedProduct.manufacturer}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Manufacturer"
          />
          <input
            name="stock"
            type="number"
            value={updatedProduct.stock}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock"
          />
          <input
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={updatedProduct.available}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Available</span>
          </label>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded transition-colors hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded transition-colors hover:bg-blue-700"
            onClick={handleSave}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
