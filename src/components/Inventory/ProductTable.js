const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Products</th>
          <th className="border px-4 py-2">Manufacturer</th>
          <th className="border px-4 py-2">Stock</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Availability</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">{product.manufacturer}</td>
            <td className="border px-4 py-2">{product.stock}</td>
            <td className="border px-4 py-2">{product.description}</td>
            <td className="border px-4 py-2">{product.available ? "Yes" : "No"}</td>
            <td className="border px-4 py-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => onEdit(product)}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(product._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
