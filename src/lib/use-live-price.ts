import { useEffect, useState } from "react";
import { PRICE } from "@/lib/site";

export function useLivePrice() {
  const [price, setPrice] = useState<number>(PRICE.value);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPrice((p) => {
        const next = p * (1 + (Math.random() - 0.42) * 0.004);
        return Math.min(0.0054, Math.max(0.0036, next));
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return price;
}
