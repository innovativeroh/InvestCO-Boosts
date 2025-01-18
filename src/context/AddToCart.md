# Add to Cart Feature Code

This code is intended for adding an item to the shopping cart in a React application. It utilizes the `useCart` context hook to manage the cart state.

```tsx
import { useCart } from "@/context/CartContext"; // Hook for managing cart state

// ProductDetails Component
const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToCart } = useCart(); // Hook to add items to cart

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
        setProduct(data.data.product);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        uniqid: product.uniqid,
        title: product.title,
        price: product.price,
        quantity: 1
      };
      addToCart(cartItem); // Add the product to the cart
    }
  };

  if (isLoading || !product) {
    return <Loading />;
  }

  return (
    <div className="product-details">
      <button
        onClick={handleAddToCart}
        className="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
};
