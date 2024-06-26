import { ReactNode, forwardRef } from "react";

import { Box } from "@/components";

type DropdownProps = {
  isOpen: boolean;
  children: ReactNode;
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ isOpen, children }, ref) => {
    return (
      <Box
        ref={ref}
        position="absolute"
        mt="s"
        px="s"
        py="xs"
        className={`${
          isOpen ? "block" : "hidden"
        } text-right z-10 w-[200px] right-0 origin-top-right rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        {children}
      </Box>
    );
  }
);
