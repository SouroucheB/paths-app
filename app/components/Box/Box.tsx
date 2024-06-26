import React from "react";
import { cva } from "class-variance-authority";

// @see https://scottbolinger.com/create-a-polymorphic-component-with-typescript-and-react/
// @see https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
// @see https://brain.d.foundation/Engineering/Frontend/Build+polymorphic+React+components+with+Typescript
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropWithAs<C extends React.ElementType, Props = {}> = Props & AsProp<C>;

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = PropWithAs<C, Props> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof PropWithAs<C, Props>>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

type Sizes = "auto" | "xs" | "s" | "m" | "halfL" | "l" | "xl";

export type Margins = {
  m?: Exclude<Sizes, "auto">;
  mx?: Exclude<Sizes, "auto">;
  my?: Exclude<Sizes, "auto">;
  mt?: Exclude<Sizes, "auto">;
  mr?: Sizes;
  mb?: Exclude<Sizes, "auto">;
  ml?: Sizes;
};

// @see https://stackoverflow.com/a/56916686/16625036
export type Paddings = {
  p?: Exclude<Sizes, "auto">;
  px?: Exclude<Sizes, "auto">;
  py?: Exclude<Sizes, "auto">;
  pt?: Exclude<Sizes, "auto">;
  pr?: Exclude<Sizes, "auto">;
  pb?: Exclude<Sizes, "auto">;
  pl?: Exclude<Sizes, "auto">;
};

type CustomBoxProps = React.HTMLAttributes<HTMLDivElement> &
  React.CSSProperties &
  Margins &
  Paddings & {
    fullWidth?: boolean;
  };

const box = cva("box", {
  variants: {
    position: {
      absolute: "absolute",
      relative: "relative",
    } as keyof React.CSSProperties["position"],
    my: {
      xs: "my-xs",
      s: "my-s",
      m: "my-m",
      halfL: "my-halfL",
      l: "my-l",
      xl: "my-xl",
    },
    mt: {
      auto: "mt-auto",
      xs: "mt-xs",
      s: "mt-s",
      m: "mt-m",
      halfL: "mt-halfL",
      l: "mt-l",
      xl: "mt-xl",
    },
    ml: {
      auto: "ml-auto",
      xs: "ml-xs",
      s: "ml-s",
      m: "ml-m",
      halfL: "ml-halfL",
      l: "ml-l",
      xl: "ml-xl",
    },
    px: {
      xs: "px-xs",
      s: "px-s",
      m: "px-m",
      halfL: "px-halfL",
      l: "px-l",
      xl: "px-xl",
    },
    py: {
      xs: "py-xs",
      s: "py-s",
      m: "py-m",
      halfL: "py-halfL",
      l: "py-l",
      xl: "py-xl",
    },
    pt: {
      auto: "pt-auto",
      xs: "pt-xs",
      s: "pt-s",
      m: "pt-m",
      halfL: "pt-halfL",
      l: "pt-l",
      xl: "pt-xl",
    },
    pb: {
      auto: "pb-auto",
      xs: "pb-xs",
      s: "pb-s",
      m: "pb-m",
      halfL: "pb-halfL",
      l: "pb-l",
      xl: "pb-xl",
    },
    fullWidth: {
      true: "w-full",
    },
  },
});

type BoxProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  CustomBoxProps
>;

type BoxComponent = <C extends React.ElementType = "div">(
  props: BoxProps<C>
) => React.ReactElement | null;

export const Box: BoxComponent = React.forwardRef(
  <C extends React.ElementType = "div">(
    props: BoxProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      as: Component = "div",
      children,
      fullWidth,
      className,
      my,
      mt,
      ml,
      px,
      py,
      pt,
      pb,
      position,
      ...otherProps
    } = props;

    return (
      <Component
        ref={ref}
        className={box({
          fullWidth,
          my,
          mt,
          ml,
          px,
          py,
          pt,
          pb,
          position,
          className,
        })}
        {...otherProps}
      >
        {children}
      </Component>
    );
  }
) as any;
