"use client";
import React from "react";
import classNames from "classnames";

// ---- components
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
    "flex max-w-3xl border-0 justify-center relative gap-2 focus:outline-none text-white  font-medium rounded-[35px] text-base  items-center";

  const computedClasses = classNames({
    "bg-customViolet-900  hover:bg-[#4f4bbb]":
      type === "primary" && !isDisabled,
    "bg-customBlue-500  hover:bg-[#316cc0] ":
      type === "secondary",
    "bg-customRed-900  hover:bg-customBlue-500":
      type === "danger",
    "!border border-customViolet-900 focus:ring-0 hover:bg-customBlue-50": type === "back",
    "cursor-not-allowed": isLoading || (isDisabled && type !== "primary"),
    "cursor-not-allowed bg-customBlue-300": isDisabled && type === "primary",
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
