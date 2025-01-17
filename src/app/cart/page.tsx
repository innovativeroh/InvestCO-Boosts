"use client"
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  uniqid: string;
  title: string;
  quantity: number;
  price: number;
};

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    // Initialize Sellix script
    const script = document.createElement("script");
    script.src = "https://cdn.sellix.io/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.initializeSellixEmbed) {
        window.initializeSellixEmbed();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const getCartUniqids = (): string => {
    return cart
      .flatMap((item) => Array(item.quantity).fill(item.uniqid))
      .join(",");
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (window.initializeSellixEmbed) {
      window.initializeSellixEmbed();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto text-white mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.title}</span>
                <span>Quantity: {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            data-sellix-cart={getCartUniqids()}
            type="submit"
            className="bg-green-500 text-white rounded-xl py-2 px-6 font-semibold hover:bg-green-600 mt-6"
          >
            Purchase
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
