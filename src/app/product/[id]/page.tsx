// app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import Header from "@/components/core/Header";
import BackgroundBeams from "@/components/ui/background-beams";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

interface CartItem extends Product {
  quantity: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const response = await fetch(`https://dev.sellix.io/v1/products/${id}`, {
          headers: {
            Authorization: `Bearer ZAOA8KCIJR4eyLkkHgIZFeRl7Wu1dbQaN8QVaXydZA9AlMrNJvIhfS7H5mlw4n8A`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error parsing cart data:", err);
      }
    }
  }, []);

  const handleAddToCart = (product: Product): void => {
    try {
      const updatedCart = (() => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
          return cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...cart, { ...product, quantity: 1 }];
      })();

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (err) {
      console.error("Error updating cart:", err);
      setError("Failed to add item to cart");
    }
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <BackgroundBeams />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Product Details</h1>
          <Link href="/cart" className="group">
            <div className="flex items-center gap-2 text-white group-hover:text-purple-400 transition-colors">
              <IoCartOutline size={28} />
              <span className="font-medium">View Cart ({cart.length})</span>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{product.title}</CardTitle>
              <CardDescription className="text-gray-400">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.image_attachment && (
                  <div className="relative aspect-video">
                    <Image
                      src={`https://imagedelivery.net/${product.image_attachment.cloudflare_image_id}/public`}
                      alt={product.title}
                      className="w-full h-full rounded-lg object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                )}
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between">
                  <span>Product ID:</span>
                  <span className="text-purple-400">{product.uniqid}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-purple-400">{product.type || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="text-purple-400">{formatDate(product.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="text-purple-400">{formatDate(product.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
