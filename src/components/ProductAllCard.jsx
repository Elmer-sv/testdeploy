import React from "react";
import { useProducts } from "../context/ProductContext";

function ProductAllCard({ product }) {
    const { addToCart } = useProducts();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="bg-blue-200 max-w-md w-full p-10 rounded-md my-4 shadow-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{product.title}</h1>
            </header>
            <div>
                <p className="text-slate-600">${product.price}</p>
                <p className="text-slate-950">{product.description}</p>
            </div>
            <div className="flex justify-center mt-4">
                <img src={product.image} alt={`Image of ${product.title}`} />
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleAddToCart}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

export default ProductAllCard;
