export const formatTextWithSpacing = (text: string): string[] => {
    return text
      .split("\\r\\n\\r\\n") // Split by double newlines
      .map((line) => line.replace(/^\[\+\]\s*/, "")); // Remove the "[+] " prefix
  };
  