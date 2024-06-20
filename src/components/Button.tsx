"use client";
import React from "react";
import classNames from "classnames";

import { IconLoader } from "@tabler/icons-react";

interface Props {
  buttonType?: "submit" | "button";
  children: React.ReactNode;
  customClassButton?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "back" | "danger" | "primary" | "secondary";
}

export const Button = ({
  buttonType,
  children,
  customClassButton,
  isDisabled = false,
  isLoading = false,
  onClick,
  type = "primary",
}: Props) => {
  const baseClasses =
    "flex max-w-3xl border justify-center relative gap-2 focus:outline-none text-white focus:ring-1 font-medium rounded-[35px] text-base  items-center";

  const computedClasses = classNames({
    "bg-customViolet-900 border-customViolet-900 focus:ring-customViolet-300":
      type === "primary",
    "bg-customBlue-500 border-customBlue-500 focus:ring-customBlue-300":
      type === "secondary",
    "bg-customRed-900  border-customRed-900  focus:ring-customRed-600":
      type === "danger",
    "border-customViolet-900 focus:ring-0": type === "back",
    "bg-customBlue-300 cursor-not-allowed ": isLoading || isDisabled,
    "pr-10": isLoading,
    "cursor-not-allowed bg-customViolet-300": isLoading || isDisabled,
  });

  return (
    <button
      type={buttonType}
      disabled={isLoading || isDisabled}
      className={`${baseClasses} ${computedClasses} ${customClassButton}`}
      onClick={() => onClick && onClick()}
    >
      {children}
      {isLoading && (
        <div className="absolute right-2 ">
          <IconLoader
            className="animate-spin animate-duration-[2000ms] text-white"
            stroke={2}
            size={24}
          />
        </div>
      )}
    </button>
  );
};
