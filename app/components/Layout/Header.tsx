"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  ButtonIcon,
  ButtonNavigation,
  Dropdown,
  LinkNavigation,
  Text,
} from "@/components";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useClerk } from "@clerk/nextjs";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";
import { useToggeable } from "@/hooks/useToggeable";

export type HeaderProps = React.FC<{
  className?: string;
  user: {
    firstName: string;
    lastName: string;
  } | null;
}>;

export const Header: HeaderProps = ({ className, user, ...props }) => {
  const { signOut } = useClerk();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, toggle, setValue] = useToggeable();
  useClickOutside(ref, () => {
    setValue(false);
  });

  return (
    <header
      className={twMerge("sticky top-0 z-10 px-4 py-4 bg-gray-200", className)}
      {...props}
    >
      <Text className="text-center">Career Path</Text>
      {!user ? (
        <Box
          position="absolute"
          className="top-1/2 -translate-y-1/2 right-[20px]"
        >
          <LinkNavigation href="/sign-in">Log in</LinkNavigation>
          <LinkNavigation intent="primary" className="ml-4" href="/sign-up">
            Get for free
          </LinkNavigation>
        </Box>
      ) : (
        <Box
          position="absolute"
          className="top-1/2 -translate-y-1/2 right-[20px]"
        >
          <Box className="flex items-center gap-[20px]">
            <LinkNavigation
              href="/upload"
              intent="primary"
              className="whitespace-nowrap"
            >
              Upload a Resume
            </LinkNavigation>
            <Box position="relative">
              <ButtonIcon onClick={toggle}>
                <Box className="bg-pink-100 inline-block h-10 w-10 rounded-full ring-2 ring-white">
                  <Text bold className="text-2xl leading-10 text-amber-700">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </Text>
                </Box>
              </ButtonIcon>
              <Dropdown ref={ref} isOpen={isOpen}>
                <Text medium>{`${user?.firstName} ${user?.lastName}`}</Text>
                <Box
                  my="s"
                  className="flex-grow border-t-2 rounded-lg border-gray-200"
                />
                <ButtonNavigation
                  className="justify-between"
                  size="small"
                  fullWidth
                  onClick={() => signOut({ redirectUrl: "/settings" })}
                  hasStartIcon
                  startIcon={<Cog8ToothIcon className="size-4" />}
                >
                  Settings
                </ButtonNavigation>
                <ButtonNavigation
                  className="justify-between"
                  size="small"
                  fullWidth
                  onClick={() => signOut({ redirectUrl: "/" })}
                  hasStartIcon
                  startIcon={
                    <ArrowLeftStartOnRectangleIcon className="size-4" />
                  }
                >
                  Sign Out
                </ButtonNavigation>
              </Dropdown>
            </Box>
          </Box>
        </Box>
      )}
    </header>
  );
};
