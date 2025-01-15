"use client"
import { BorderBeam } from "@/components/ui/border-beam";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
interface ImageAttachment {
  name: string;
  cloudflare_image_id: string;
}

interface Product {
  id: number;
  uniqid: string;
  title: string;
  description: string;
  price: number;
  image_attachment?: ImageAttachment;
  sellix_product_id: string; // Add the Sellix product ID
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dev.sellix.io/v1/products", {
          headers: {
            Authorization:
              "Bearer ZAOA8KCIJR4eyLkkHgIZFeRl7Wu1dbQaN8QVaXydZA9AlMrNJvIhfS7H5mlw4n8A"
          }
        });
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Include Sellix's embed script for the purchase button
    const script = document.createElement("script");
    script.src = "https://cdn.sellix.io/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 max-w-[1200px] m-auto">
        {products.map((product) => {
          const imageUrl = product.image_attachment
            ? `https://imagedelivery.net/95QNzrEeP7RU5l5WdbyrKw/${product.image_attachment.cloudflare_image_id}/public`
            : null;

          return (
            <div
              key={product.id}
              className="relative flex flex-col text-white bg-black w-full overflow-hidden rounded-lg shadow-md"
            >
              {/* Product Image */}
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={product.title}
                  width={300}
                  height={150}
                  className="object-cover w-full h-48 rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/api/placeholder/400/320";
                    e.currentTarget.onerror = null;
                  }}
                />
              )}
              {/* Product Details */}
              <div className="text-left p-4">
                <div>
                  <h2 className="text-xl font-bold outfit-font ">{product.title}</h2>
                </div>
                <p className="text-sm block mt-1">
                  Starting at
                  <span className="text-white pl-1 outfit-font ">${product.price}</span>
                </p>
              </div>
              <button
                data-sellix-product={product.uniqid}
                type="submit"
                className="transition hover:text-white bg-gradient-to-r from-fuchsia-300 to-violet-500  text-white m-4 rounded-xl py-2 outfit-font font-semibold hover:bg-blue-950"
              >
                Purchase
              </button>
              <BorderBeam />
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Products;
