import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  screen: "sm" | "md" | "lg" | "xl";
}

export default function Container({
  children,
  screen,
  ...other
}: ContainerProps) {
  return (
    <div
      className={clsx("mx-auto", {
        "max-w-[1150px]": screen === "xl",
        "max-w-screen-lg": screen === "lg",
        "max-w-screen-md": screen === "md",
        "max-w-screen-sm": screen === "sm",
      })}
      {...other}
    >
      {children}
    </div>
  );
}
