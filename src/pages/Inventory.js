import { useState } from "react";
import ProductTable from "../components/Inventory/ProductTable";
import AddProduct from "../components/Inventory/AddProduct"; // Ensure this import is correct
import UpdateProduct from "../components/Inventory/UpdateProduct"; // Ensure this import is correct

export default function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([
    { _id: 1, name: "Product A", manufacturer: "Brand X", stock: 100, description: "High quality product", available: true },
    { _id: 2, name: "Product B", manufacturer: "Brand Y", stock: 50, description: "Affordable product", available: true },
    { _id: 3, name: "Product C", manufacturer: "Brand Z", stock: 75, description: "Premium quality product", available: true },
    { _id: 4, name: "Product D", manufacturer: "Brand A", stock: 200, description: "Value for money", available: true },
    { _id: 5, name: "Product E", manufacturer: "Brand B", stock: 30, description: "Best in class", available: true },
    { _id: 6, name: "Product F", manufacturer: "Brand C", stock: 120, description: "Highly recommended", available: true },
    { _id: 7, name: "Product G", manufacturer: "Brand D", stock: 60, description: "Top rated product", available: true },
    { _id: 8, name: "Product H", manufacturer: "Brand E", stock: 40, description: "Popular choice", available: true },
    { _id: 9, name: "Product I", manufacturer: "Brand F", stock: 90, description: "Customer favorite", available: true },
    { _id: 10, name: "Product J", manufacturer: "Brand G", stock: 110, description: "Best seller", available: true },
    { _id: 11, name: "Product A", manufacturer: "Brand X", stock: 100, description: "High quality product", available: true },
    { _id: 12, name: "Product B", manufacturer: "Brand Y", stock: 50, description: "Affordable product", available: true },
    { _id: 13, name: "Product C", manufacturer: "Brand Z", stock: 75, description: "Premium quality product", available: true },
    { _id: 14, name: "Product D", manufacturer: "Brand A", stock: 200, description: "Value for money", available: true },
    { _id: 15, name: "Product E", manufacturer: "Brand B", stock: 30, description: "Best in class", available: true },
    { _id: 16, name: "Product F", manufacturer: "Brand C", stock: 120, description: "Highly recommended", available: true },
    { _id: 17, name: "Product G", manufacturer: "Brand D", stock: 60, description: "Top rated product", available: true },
    { _id: 18, name: "Product H", manufacturer: "Brand E", stock: 40, description: "Popular choice", available: true },
    { _id: 19, name: "Product I", manufacturer: "Brand F", stock: 90, description: "Customer favorite", available: true },
    { _id: 20, name: "Product J", manufacturer: "Brand G", stock: 110, description: "Best seller", available: true },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const addProductModalSetting = () => setShowProductModal(!showProductModal);
  const updateProductModalSetting = (selectedProduct) => {
    setUpdateProduct(selectedProduct);
    setShowUpdateModal(!showUpdateModal);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Products</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md">
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addProductModalSetting}
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Product Table */}
          <ProductTable
            products={filteredProducts}
            updateProductModalSetting={updateProductModalSetting}
          />
        </div>

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}
      </div>
    </div>
  );
}
