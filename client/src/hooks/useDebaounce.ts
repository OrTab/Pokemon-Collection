import { useCallback, useEffect, useRef } from "react";

export const useDebounce = <T>(cb: (value: T) => void, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);

  const debounceCallback = useCallback(
    (value: T) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        cb(value);
      }, delay);
    },
    [cb, delay]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return debounceCallback;
};
