import { VariantProps, cva } from "class-variance-authority";

import Link from "next/link";
import { ReactNode } from "react";

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-brandPrimary-default",
        "text-white",
        "hover:bg-brandPrimary-hover",
      ],
      secondary: ["text-black", "hover:bg-gray-100"],
    },
    size: {
      small: ["text-sm", "rounded-md", "py-1", "px-2"],
      medium: ["rounded-md", "py-2", "px-4"],
    },
    fullWidth: {
      true: "w-full",
    },
    hasStartIcon: {
      true: "flex items-center",
    },
  },
  compoundVariants: [
    {
      intent: ["primary", "secondary"],
      size: ["small", "medium"],
      class: "text-center",
    },
  ],
  defaultVariants: {
    intent: "secondary",
    size: "medium",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    onClick: () => void;
    startIcon?: ReactNode;
    fullWidth?: boolean;
    hasStartIcon?: boolean;
  };

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof button> & {
    href: string;
    startIcon?: ReactNode;
    fullWidth?: boolean;
    hasStartIcon?: boolean;
  };

export const LinkNavigation: React.FC<LinkProps> = ({
  children,
  className,
  intent,
  size,
  hasStartIcon,
  href,
  fullWidth,
  ...props
}) => (
  <Link
    href={href}
    className={button({ intent, size, fullWidth, hasStartIcon, className })}
    {...props}
  >
    {children}
  </Link>
);

export const ButtonNavigation: React.FC<ButtonProps> = ({
  children,
  className,
  intent,
  size,
  onClick,
  hasStartIcon,
  startIcon,
  fullWidth,
  ...props
}) => (
  <button
    onClick={onClick}
    className={button({ intent, size, fullWidth, hasStartIcon, className })}
    {...props}
  >
    {startIcon && startIcon}
    {children}
  </button>
);
