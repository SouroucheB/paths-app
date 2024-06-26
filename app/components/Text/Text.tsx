import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { PolymorphicComponentProps } from "@/components/Box/Box";

type Sizes =
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type CustomTextProps = VariantProps<typeof text> & {
  semibold?: boolean;
  medium?: boolean;
  bold?: boolean;
  center?: boolean;
  size?: Sizes;
};

type TextProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  CustomTextProps
>;

const text = cva(["font-poppins"], {
  variants: {
    intent: {
      h1: ["font-bold"],
      p: [],
      error: ["text-sm", "text-red-500", "font-medium"],
    },
    size: {
      xs: "text-xs",
      s: "text-sm",
      m: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    medium: {
      true: "font-medium",
    },
    semibold: {
      true: "font-semibold",
    },
    bold: {
      true: "font-bold",
    },
    center: {
      true: "text-center",
    },
  },
  defaultVariants: {
    intent: "p",
  },
});

// @todo : https://www.hexa-web.fr/blog/create-a-polymorphic-button-with-typescript-react-nextjs-tailwindcss
export const Text = <C extends React.ElementType = "p">({
  as,
  children,
  className,
  intent,
  medium,
  semibold,
  bold,
  center,
  size,
  ...otherProps
}: TextProps<C>) => {
  const Component = as || "p";

  return (
    <Component
      className={text({
        intent,
        medium,
        semibold,
        bold,
        center,
        size,
        className,
      })}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
