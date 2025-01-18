declare global {
  interface Window {
    Sellix: {
      load: () => void; // Define the load method
      // Add other methods and properties as needed
    };
  }
} 