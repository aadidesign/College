import { useState } from "react";
import ProductTable from "../components/Inventory/ProductTable";

export default function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([
    { _id: 1, name: "Product A", manufacturer: "Brand X", stock: 100, description: "High quality product", available: true },
    { _id: 2, name: "Product B", manufacturer: "Brand Y", stock: 50, description: "Affordable product", available: true },
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

          <ProductTable
            products={filteredProducts}
            updateProductModalSetting={updateProductModalSetting}
          />
        </div>

        {showProductModal && (
          <AddProduct addProductModalSetting={addProductModalSetting} />
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
