'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoCartOutline, IoArrowBack } from "react-icons/io5";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BackgroundBeams from "@/components/ui/background-beams";
import Header from "@/components/core/Header";
import { BiTrash } from "react-icons/bi";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(savedCart);

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
        document.body.removeChild(script);
      };
    }
  }, [setCart]);

  const getCartUniqids = (): string =>
    cart.flatMap((item) => Array(item.quantity).fill(item.uniqid)).join(",");

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (window.initializeSellixEmbed) {
      window.initializeSellixEmbed();
    }
  };

  const getTotalPrice = (): number =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isClient) return null; // Prevents server-client mismatch

  return (
    <>
      <Header />
      <div className="min-h-screen text-white">
        <BackgroundBeams />
        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              <IoArrowBack className="mr-2" />
              <span>Back to Products</span>
            </Link>
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>

          <Card className="bg-gray-900/60 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <IoCartOutline className="mr-2" size={24} />
                Cart Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length > 0 ? (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center py-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-purple-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="mt-1"
                        >
                          <BiTrash />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center py-4 text-white">Your cart is empty.</p>
              )}
            </CardContent>
            {cart.length > 0 && (
              <CardFooter className="flex flex-col items-end">
                <Separator className="mb-4" />
                <div className="flex justify-between w-full mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold text-white">${getTotalPrice().toFixed(2)}</span>
                </div>
                <button data-sellix-cart={getCartUniqids()} type="submit" className="text-white flex">
                  Proceed to Checkout <ArrowRight />
                </button>
                <button data-sellix-cart="" type="submit" className="text-white flex">
                  Proceed to Checkout  TEST <ArrowRight />
                </button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cart;
