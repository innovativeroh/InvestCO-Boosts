import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { BorderBeam } from "@/components/ui/border-beam";
import { IoCartOutline } from "react-icons/io5";
// Define types
type ImageAttachment = {
  name: string;
  cloudflare_image_id: string;
};

type Product = {
  id: number;
  uniqid: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image_attachment?: ImageAttachment;
};

type CartItem = Product & {
  quantity: number;
};

declare global {
  interface Window {
    Sellix: Record<string, unknown>;
    initializeSellixEmbed: () => void;
  }
}

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ data: { products: Product[] } }>(
          "https://dev.sellix.io/v1/products",
          {
            headers: {
              Authorization:
                "Bearer ZAOA8KCIJR4eyLkkHgIZFeRl7Wu1dbQaN8QVaXydZA9AlMrNJvIhfS7H5mlw4n8A",
            },
          }
        );

        const productsWithStock = response.data.data.products.map((product) => ({
          ...product,
          stock: Math.floor(Math.random() * 10), // Randomize stock for demo
        }));

        setProducts(productsWithStock);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Load Sellix embed script
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

  const handleAddToCart = (product: Product): void => {
    const updatedCart = (() => {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          return cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return cart;
      }
      return [...cart, { ...product, quantity: 1 }];
    })();

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (window.initializeSellixEmbed) {
      window.initializeSellixEmbed();
    }
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
        <div className="max-w-[1200px] mx-auto flex justify-between items-center mt-10">
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <Link href="/cart">
            <span className="text-white font-bold hover:underline flex flex-wrap gap-2 items-center">
              <IoCartOutline size={28} /> Cart ({getTotalItems()} items)
            </span>
          </Link>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 max-w-[1200px] m-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col text-white bg-black w-full overflow-hidden rounded-lg shadow-md"
          >
            {product.image_attachment && (
              <Image
                src={`https://imagedelivery.net/95QNzrEeP7RU5l5WdbyrKw/${product.image_attachment.cloudflare_image_id}/public`}
                alt={product.title}
                width={300}
                height={150}
                className="object-cover w-full h-48 rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = "/api/placeholder/400/320";
                }}
              />
            )}
            <div className="text-left p-4">
              <h2 className="text-xl font-bold outfit-font">{product.title}</h2>
              <p className="text-sm mt-1">
                Starting at <span className="text-white pl-1 outfit-font">${product.price}</span>
              </p>
              <p className="text-sm text-gray-400">
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>
            </div>
            {product.stock > 0 ? (
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-gradient-to-r from-fuchsia-300 to-violet-500 text-white m-4 rounded-xl py-2 font-semibold hover:bg-blue-950"
              >
                Add to Cart
              </button>
            ) : (
              <button disabled className="bg-gray-600 text-white m-4 rounded-xl py-2 cursor-not-allowed">
                Sold Out
              </button>
            )}
            <BorderBeam />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;