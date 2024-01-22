import { useRef, useEffect } from "react";

/* 
Return side scroll functionality
*/

export default function useSideScroll(doResizeFunction: boolean) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLDivElement>(null!);
  const currentStartRef = useRef<number>(0);

  useEffect(() => {
    const resizeFunction = () => {
      if (doResizeFunction === false) return;

      containerRef.current.style.scrollBehavior = "auto";
      containerRef.current.scrollLeft =
        listRef.current.children[
          currentStartRef.current
        ].getBoundingClientRect().left -
        listRef.current.getBoundingClientRect().left;
      containerRef.current.style.scrollBehavior = "smooth";
    };

    window.addEventListener("resize", resizeFunction);

    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, [doResizeFunction]);

  const scrollTo = async (direction: "left" | "right") => {
    const parentRect = containerRef.current.getBoundingClientRect();
    const rect = listRef.current.getBoundingClientRect();

    if (direction === "right") {
      for (let i = 0; i < listRef.current.children.length; i++) {
        if (
          parentRect.width + parentRect.left <
          listRef.current.children[i].getBoundingClientRect().left +
            listRef.current.children[i].getBoundingClientRect().width -
            1
        ) {
          currentStartRef.current = i;

          containerRef.current.scrollLeft =
            listRef.current.children[i].getBoundingClientRect().left -
            rect.left;

          return;
        }
      }
    }

    if (direction === "left") {
      for (let i = listRef.current.children.length - 1; i >= 0; i--) {
        if (
          listRef.current.children[i].getBoundingClientRect().left <
          parentRect.left -
            parentRect.width +
            listRef.current.children[i].getBoundingClientRect().width
        ) {
          currentStartRef.current = i;
          containerRef.current.scrollLeft =
            listRef.current.children[i].getBoundingClientRect().left -
            rect.left;
          return;
        }
      }

      currentStartRef.current = 0;
      containerRef.current.scrollLeft =
        listRef.current.children[0].getBoundingClientRect().left - rect.left;
      return;
    }
  };

  return { containerRef, listRef, scrollTo };
}
