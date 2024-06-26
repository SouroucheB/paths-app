import { Header, HeaderProps } from "./Header";

import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

type MainProps = React.FC<React.HTMLAttributes<HTMLElement>>;

export const Main: MainProps = ({ children, className, ...props }) => {
  return (
    <main className={twMerge(inter.className, className)} {...props}>
      {children}
    </main>
  );
};
