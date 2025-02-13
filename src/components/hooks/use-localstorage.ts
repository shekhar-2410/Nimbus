import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, intialValue: T) {
  const [storeValue, setStoreValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : intialValue;
    } catch (err) {
      console.log(err);
      return intialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storeValue));
  }, [key, storeValue]);
  return [storeValue, setStoreValue] as const;
}
