"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

type Product = {
  id: number;
  uniqid: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image_attachment?: ImageAttachment;
};

type ImageAttachment = {
  name: string;
  cloudflare_image_id: string;
};

type CartItem = Product & {
  quantity: number;
};

export default function ProductDetails() {
  const { id } = useParams();
  console.log("Uniq ID ", id);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(
    () => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://dev.sellix.io/v1/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ZAOA8KCIJR4eyLkkHgIZFeRl7Wu1dbQaN8QVaXydZA9AlMrNJvIhfS7H5mlw4n8A`
              }
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }

          const data = await response.json();
          setProduct(data.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      };

      fetchProduct();
    },
    [id]
  );

  const handleAddToCart = (product: any): void => {
    const updatedCart = (() => {
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        return cart.map(
          item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
        );
      }
      return [...cart, { ...product, quantity: 1 }];
    })();

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (error) {
    return (
      <div className="text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 ">
      <div className="max-w-[1200px] bg-black mx-auto flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Link href="/cart">
          <span className="text-white font-bold hover:underline flex flex-wrap gap-2 items-center">
            <IoCartOutline size={28} /> View Cart
          </span>
        </Link>
      </div>
      <div>
        <button
          onClick={() => handleAddToCart(product.product.uniqid)}
          className="bg-gradient-to-r from-fuchsia-300 to-violet-500 text-white rounded-xl py-2 font-semibold hover:bg-blue-950 mt-4"
        >
          Add to Cart
        </button>
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(product, null, 2)}
        </pre>
      </div>
    </div>
  );
}
