import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}