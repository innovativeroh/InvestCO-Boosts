// app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import Link from "next/link";
// import { IoCartOutline } from "react-icons/io5";

import Header from "@/components/core/Header";
import BackgroundBeams from "@/components/ui/background-beams";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Loading from "@/app/loading/page";
import Feedbacks from "@/components/api/Feedback";

interface ImageAttachment {
  cloudflare_image_id: string;
}

interface Product {
  id: number;
  uniqid: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image_attachment?: ImageAttachment;
  currency: string;
  type: string;
  created_at: number;
  updated_at: number;
}

declare global {
  interface Window {
    Sellix: {
      load: () => void;
    };
    initializeSellixEmbed: () => void;
  }
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.sellix.io/static/js/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(
    () => {
      const fetchProduct = async () => {
        if (!id) return;

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
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setProduct(data.data.product);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    },
    [id]
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        // setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error parsing cart data:", err);
      }
    }
  }, []);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-500 p-8 text-center bg-red-100/10 rounded-lg">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !product) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <BackgroundBeams />

      <main className="container max-w-[1200px] mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Product</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-zinc-950/80 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                {product.title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.image_attachment &&
                  <div className="relative aspect-video">
                    <Image
                      src={`https://imagedelivery.net/95QNzrEeP7RU5l5WdbyrKw/${product
                        .image_attachment.cloudflare_image_id}/public`}
                      alt={product.title}
                      className="w-full h-full rounded-lg object-cover"
                      width={400}
                      height={300}
                    />
                  </div>}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {product.price !== undefined && !isNaN(product.price)
                      ? `${product.price.toFixed(2)} ${product.currency}`
                      : "Price not available"}
                  </span>
                  <Badge variant="secondary" className="text-lg">
                    Stock: {product.stock === -1 ? "∞" : product.stock}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent relative border-transparent">
            <div className="bg-gray-950/40 border-zinc-800 border-[1px] rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Additional Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between">
                    <span>Product ID:</span>
                    <span className="text-purple-400">
                      {product.uniqid}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-purple-400">
                      {product.type || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="text-purple-400">
                      {formatDate(product.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="text-purple-400">
                      {formatDate(product.updated_at)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <div className="p-4">
              <button
                data-sellix-product={product.uniqid}
                type="button"
                className="bg-gradient-to-r from-fuchsia-300 w-full to-violet-500 text-white mt-4 rounded-xl py-2 font-semibold hover:bg-blue-950"
              >
                Purchase
              </button>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Feedbacks />
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
