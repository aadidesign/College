import { useState, useEffect } from "react";

export default function ProductForm({ product, editMode, addNewProduct, updateProduct, onClose }) {
  const [productData, setProductData] = useState({
    name: "",
    manufacturer: "",
    stock: 0,
    description: "",
    available: true,
    more: "",
  });

  useEffect(() => {
    if (editMode && product) {
      setProductData(product); // Pre-fill form with selected product data if editing
    }
  }, [editMode, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateProduct(productData); // Update product if in edit mode
    } else {
      addNewProduct(productData); // Add new product if in add mode
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={productData.manufacturer}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Availability</label>
            <select
              name="available"
              value={productData.available}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">More Info</label>
            <input
              type="text"
              name="more"
              value={productData.more}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {editMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
