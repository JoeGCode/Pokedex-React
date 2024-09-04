import { useState, useEffect } from "react";

/**
 * Get a value from local storage, or use the initial state if it is not there.
 * Set the value back to local storage whenever it changes.
 * @param {string} key
 * @param {T} initialState
 * @returns {[T, (newValue: T) => void]}
 */
export function useLocalStorage<T>(
  initialState: T,
  key: string
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
