import React from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const { deleteProduct } = useProducts();

    return (
        <div className="bg-gray-400 max-w-md w-full p-10 rounded-md my-4 shadow-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            deleteProduct(product._id);
                        }}
                    >
                        Delete
                    </button>
                    <Link
                        to={`/products/${product._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Edit
                    </Link>
                </div>
            </header>
            <div>
                <p className="text-slate-600">${product.price}</p>
                <p className="text-slate-950">{product.description}</p>
            </div>
            <div className="flex justify-center mt-4">
                <img src={product.image} alt={`Image of ${product.title}`} />
            </div>
        </div>
    );
}

export default ProductCard;
