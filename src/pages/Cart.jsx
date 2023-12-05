import React from "react";
import { useProducts } from "../context/ProductContext";

function Cart() {
  const { cart, total, removeFromCart, clearCart } = useProducts();

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cart.map((product, index) => (
              <div key={`${product._id}-${index}`} className="bg-gray-400 max-w-md w-full p-10 rounded-md my-4 shadow-md">
                <header className="flex justify-between">
                  <h1 className="text-2xl font-bold">{product.title}</h1>
                  <button onClick={() => removeFromCart(product._id)} className="text-red-600">
                    Eliminar
                  </button>
                </header>
                <div>
                  <p className="text-slate-600">${product.price}</p>
                  <p className="text-slate-950">{product.description}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <img src={product.image} alt={`Image of ${product.title}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total a Pagar: ${total.toFixed(2)}</h2>
            <button onClick={clearCart} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2 ">
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
