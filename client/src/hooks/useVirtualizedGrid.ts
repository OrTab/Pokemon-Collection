import { useState, useEffect, useRef, useMemo } from "react";

interface UseVirtualizedGridConfig<T> {
  itemHeight: number;
  itemsPerRow: number;
  containerHeight: number;
  bufferRows?: number;
  items: T[];
}

export function useVirtualizedGrid<T>({
  itemHeight,
  itemsPerRow,
  containerHeight,
  bufferRows = 2,
  items,
}: UseVirtualizedGridConfig<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        window.requestAnimationFrame(() => {
          setScrollTop(containerRef.current?.scrollTop || 0);
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const totalRows = Math.ceil(items.length / itemsPerRow);

  const visibleStartRow = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - bufferRows
  );
  const visibleEndRow = Math.min(
    totalRows - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + bufferRows
  );

  const startIndex = visibleStartRow * itemsPerRow;
  const endIndex = Math.min(
    items.length - 1,
    (visibleEndRow + 1) * itemsPerRow - 1
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  return {
    containerRef,
    visibleItems,
    startIndex,
    endIndex,
    visibleStartRow,
    visibleEndRow,
    totalRows,
    totalHeight: totalRows * itemHeight,
    offsetTop: visibleStartRow * itemHeight,
  };
}
