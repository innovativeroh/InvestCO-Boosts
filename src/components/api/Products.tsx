import type { NextPage } from 'next';
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { BorderBeam } from "@/components/ui/border-beam";

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
    Sellix: any;
    initializeSellixEmbed: () => void;
  }
}

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ data: { products: Product[] } }>(
          "https://dev.sellix.io/v1/products",
          {
            headers: {
              Authorization: "Bearer TzuvcHcNViFZQbK9x06NYP51j8s9ONV5SKjAS1L1UXLVnv7upnQs2z8jQuKsfTOl",
            },
          }
        );

        const productsWithStock = response.data.data.products.map((product) => ({
          ...product,
          stock: Math.floor(Math.random() * 10),
        }));

        setProducts(productsWithStock);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

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
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    if (window.initializeSellixEmbed) {
      window.initializeSellixEmbed();
    }
  };

  const handleRemoveFromCart = (productId: number): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    if (window.initializeSellixEmbed) {
      window.initializeSellixEmbed();
    }
  };

  const getCartUniqids = (): string => {
    return cart
      .flatMap((item) => Array(item.quantity).fill(item.uniqid))
      .filter(Boolean) 
      .join(",");
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const PaymenthHandler = () => {
    const ids = getCartUniqids(); // Get the unique cart IDs
    const totalpayment = `${ids}`; // Convert to string
    console.log("TOTAL PAYMENT " + totalpayment);
  
    const sellixCart = document.querySelector('button[data-sellix-cart]')?.getAttribute('data-sellix-cart');
    console.log("Sellix Cart:", sellixCart);
  
  };

  console.log("Cart UniqIDs:", getCartUniqids());

  return (
    <div>
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

      <div className="mt-10 max-w-[1200px] m-auto text-white">
        <h2 className="text-2xl font-bold">Cart ({getTotalItems()} items)</h2>
        {cart.length > 0 ? (
          <>
            <ul className="mt-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between py-2 border-b">
                  <span>{item.title}</span>
                  <span>${item.price * item.quantity}</span>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-600">
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <button
  onClick={PaymenthHandler}
  type="submit"
  className="bg-green-500 text-white rounded-xl py-2 px-6 font-semibold hover:bg-green-600 mt-6"
  data-sellix-cart={getCartUniqids()}
>
  Purchase 
</button>


{/* test part */}
{/* <p>{getCartUniqids()}</p>
<button
  data-sellix-cart="66a0de6c1e028,66a1cbf42d1df,66a1cc51755a8"
  type="submit"
>
  Purchase Test
</button> */}
{/* test part */}

          </>
        ) : (
          <p className="mt-2">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
