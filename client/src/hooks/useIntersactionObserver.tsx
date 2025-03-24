import { useEffect } from "react";

type Params = {
  cb: () => void;
  element: HTMLElement | null;
  shouldBeObserved: boolean;
  hasMore: boolean;
};

export const useIntersectionObserver = ({
  cb,
  element,
  shouldBeObserved,
  hasMore,
}: Params) => {
  useEffect(() => {
    if (!shouldBeObserved || !element || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb();
        }
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [cb, element, shouldBeObserved]);
};
