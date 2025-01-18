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
    console.log('useEffect triggered');
  
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log('Loaded cart from localStorage:', savedCart);
      setCart(savedCart);
  
      if (!document.querySelector('script[src="https://cdn.sellix.io/embed.js"]')) {
        console.log('Loading Sellix script...');
        const script = document.createElement("script");
        script.src = "https://cdn.sellix.io/embed.js";
        script.async = true;
        script.onload = () => {
          if (window.Sellix) {
            console.log("Sellix script loaded successfully");
            window.Sellix.load();
          } else {
            console.warn("Sellix object not found after script load");
            // Retry loading after a short delay
            setTimeout(() => {
              if (window.Sellix) {
                console.log("Sellix object found after delay");
                window.Sellix.load();
              } else {
                console.error("Failed to load Sellix even after delay");
              }
            }, 1000);
          }
        };
        document.body.appendChild(script);
      } else {
        // If script already exists, try to initialize Sellix
        console.log('Sellix script already exists, attempting to load...');
        if (window.Sellix) {
          window.Sellix.load();
        }
      }
  
      return () => {
        const existingScript = document.querySelector('script[src="https://cdn.sellix.io/embed.js"]');
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, [setCart]);

  const getCartUniqids = (): string => {
    const uniqids = cart.flatMap((item) => Array(item.quantity).fill(item.uniqid)).join(",");
    console.log('Generated uniqids for cart:', uniqids);
    return uniqids;
  };

  const handleRemoveFromCart = (productId: number) => {
    console.log('Removing product from cart:', productId);
    const updatedCart = cart.filter((item) => item.id !== productId);
    console.log('Updated cart:', updatedCart);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (window.initializeSellixEmbed) {
      console.log('Reinitializing Sellix embed');
      window.initializeSellixEmbed();
    }
  };

  const getTotalPrice = (): number =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!isClient) return null; 

  const PaymentHandler = () => {
    const ids = getCartUniqids();
    console.log("Cart IDs for payment:", ids);
    console.log("Current cart state:", cart);
    console.log("Sellix object available:", !!window.Sellix);
    
    // Only proceed if Sellix is available
    if (!window.Sellix) {
      console.error("Sellix is not available. Attempting to reload...");
      // Attempt to reload Sellix
      const script = document.querySelector('script[src="https://cdn.sellix.io/embed.js"]');
      if (script) {
        script.remove();
      }
      const newScript = document.createElement("script");
      newScript.src = "https://cdn.sellix.io/embed.js";
      newScript.async = true;
      newScript.onload = () => {
        if (window.Sellix) {
          console.log("Sellix reloaded successfully");
          window.Sellix.load();
        }
      };
      document.body.appendChild(newScript);
      return;
    }
  }

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
                <button 
                data-sellix-cart={getCartUniqids()}
                  onClick={PaymentHandler}
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Proceed to Checkout <ArrowRight className="ml-2" />
                </button>
               
                <button 
                   data-sellix-cart="6787d2917fc7b,6787d39e203d2,672fe75f2935d"
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Proceed to Checkout  TEST <ArrowRight className="ml-2" />
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
