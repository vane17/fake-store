import { toast } from "react-toastify";
import classNames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import { IconCheck, IconX } from "@tabler/icons-react";

export type TypeOptions = "success" | "error";

interface ToasOptions {
  type?: TypeOptions;
}

export const Toast = (
  message: string,
  { type = "success" }: ToasOptions = {}
) => {
  const computedClasses = classNames({
    "text-green-600": type === "success",
    "text-red-600 ": type === "error",
  });
  toast(
    <div className="flex items-center gap-3">
      <div>
        <span>{message}</span>
      </div>
    </div>,
    {
      className: (data) => {
        return data?.defaultClassName || "w-96";
      },
      theme: "light",
      position: "bottom-right",
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      autoClose: 5000,
      type,
      icon: false,
      progressStyle: { background: "transparent" },
      progressClassName: (data) => {
        const classProgress = [];

        if (type === "success")
          classProgress.push("!bg-green-500 dark:!bg-green-400");
        if (type === "error")
          classProgress.push("!bg-red-500 dark:!bg-red-400");

        return `${data?.defaultClassName} ${classProgress.join("")}`;
      },
    }
  );
};
