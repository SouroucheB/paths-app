import { RefObject, useEffect } from "react";

const isNode = (target: EventTarget | null): target is Node => {
  return target instanceof Node;
};

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        isNode(event.target) &&
        !ref.current.contains(event.target)
      ) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
