import React from "react";

const ProductTable = ({ products, updateProductModalSetting }) => {
  return (
    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
      <thead>
        <tr>
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            Products
          </th>
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            Manufacturer
          </th>
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            Stock
          </th>
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            Description
          </th>
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            Availibility
          </th>
          <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
            More
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product._id}>
            <td className="whitespace-nowrap px-4 py-2 text-gray-900">
              {product.name}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {product.manufacturer}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {product.stock}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {product.description}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              {product.stock > 0 ? "In Stock" : "Not in Stock"}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              <span
                className="text-green-700 cursor-pointer"
                onClick={() => updateProductModalSetting(product)}
              >
                Edit
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
