import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";

// ----componets
import { IconLoader } from "@tabler/icons-react";

export interface Props {
  errorMessage?: string | boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearch?: boolean;
  isSuccess?: boolean;
  isValid?: boolean;
  label?: string;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?: ChangeEventHandler;
  placeholder: string;
  prefixIcon?: ReactNode;
  suffix?: string | ReactNode;
  type?: "text" | "number";
  value?: string;
  maxWidth?: string;
  inputType?: "input" | "textarea";
}

export const InputText = ({
  errorMessage,
  isDisabled,
  isLoading,
  isSearch,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  prefixIcon,
  suffix,
  type = "text",
  value,
  maxWidth,
  inputType = "input",
}: Props) => {
  return (
    <div className={`w-full flex flex-col gap-2 ${maxWidth}`}>
      {label && (
        <div
          className={`text-xs font-bold ${
            isDisabled ? "text-customBlue-100" : "text-customBlue-500"
          } flex items-center`}
        >
          {label}
        </div>
      )}

      <div className="relative w-full">
        {inputType === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={isDisabled}
            placeholder={placeholder}
            className={`outline-none py-2 w-full min-h-20 bg-transparent  rounded-xl text-[#494949]  border  text-xs px-5 ${
              isDisabled ? "border-customBlue-100" : "border-customBlue-500"
            }`}
          />
        ) : (
          <input
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={isDisabled}
            placeholder={placeholder}
            type={type}
            className={`outline-none w-full bg-transparent  h-[38px] rounded-xl text-[#494949] border b text-xs px-5 ${
              prefixIcon ? "pl-10" : ""
            } ${
              isDisabled ? "border-customBlue-100" : "border-customBlue-500"
            }`}
          />
        )}

        {prefixIcon && (
          <div
            className={`absolute inset-y-0 flex items-center text-zinc-500 select-none left-3`}
          >
            {prefixIcon}
          </div>
        )}

        {!!suffix && (
          <div
            className={`absolute inset-y-0 flex items-center text-zinc-400 select-none ${
              !isLoading ? "right-3" : "right-10"
            }`}
          >
            {suffix}
          </div>
        )}

        {isLoading && (
          <div
            className={`absolute inset-y-0 flex items-center text-zinc-400 select-none right-3 `}
          >
            <IconLoader className="animate-spin animate-duration-[2s]" />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="-mt-1 flex justify-start flex-col">
          <span className="text-red-500  font-medium text-[9px]">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};
