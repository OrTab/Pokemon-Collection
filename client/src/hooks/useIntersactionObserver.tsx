import { useEffect } from "react";

type Params = {
  cb: () => void;
  element: React.RefObject<HTMLElement | null>;
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
    if (!shouldBeObserved || !element?.current || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb();
        }
      });
    });

    observer.observe(element.current);

    return () => observer.disconnect();
  }, [cb, element, hasMore, shouldBeObserved]);
};
