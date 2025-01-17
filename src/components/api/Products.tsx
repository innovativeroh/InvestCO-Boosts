import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { BorderBeam } from "@/components/ui/border-beam";
import ProductSkeleton from "@/components/ui/skeleton";

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
declare global {
  interface Window {
    Sellix: Record<string, unknown>;
    initializeSellixEmbed: () => void;
  }
}

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ data: { products: Product[] } }>(
          "https://dev.sellix.io/v1/products",
          {
            headers: {
              Authorization:
                "Bearer ZAOA8KCIJR4eyLkkHgIZFeRl7Wu1dbQaN8QVaXydZA9AlMrNJvIhfS7H5mlw4n8A"
            }
          }
        );

        const productsWithStock = response.data.data.products.map(
          (product) => ({
            ...product,
            stock: Math.floor(Math.random() * 10) // Randomize stock for demo
          })
        );

        setProducts(productsWithStock);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();

    // ... (keep the existing Sellix embed script logic)
  }, []);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold text-white">Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 max-w-[1200px] m-auto">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <div key={product.id}>
                <div className="relative flex flex-col text-white bg-black w-full overflow-hidden rounded-lg shadow-md">
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
                  <Link
                    href={`/product/${product.uniqid}`}
                    className="text-left p-4"
                    passHref
                  >
                    <h2 className="text-xl font-bold outfit-font">
                      {product.title}
                    </h2>
                    <p className="text-sm mt-1">
                      Starting at{" "}
                      <span className="text-white pl-1 outfit-font">
                        ${product.price}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      {product.stock > 0
                        ? `In Stock: ${product.stock}`
                        : "Out of Stock"}
                    </p>
                    {product.stock > 0 ? (
                      <button className="bg-gradient-to-r from-fuchsia-300 w-full to-violet-500 text-white mt-4 rounded-xl py-2 font-semibold hover:bg-blue-950">
                        Purchase
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-700 text-white mt-4 w-full rounded-xl py-2 cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    )}
                  </Link>
                  <BorderBeam />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;

