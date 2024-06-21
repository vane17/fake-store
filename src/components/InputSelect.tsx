import { useEffect, useRef, useState } from "react";
import Select, {
  GroupBase,
  InputActionMeta,
  Props as SelectProps,
  components,
} from "react-select";
import AsyncSelect from "react-select/async";

type P<G> = G & { description?: string };

interface StateSelectorComp<T> {
  loading?: boolean;
  data?: T[];
  selected?: P<T>;
}

interface Props<T> extends SelectProps<T, boolean, GroupBase<T>> {
  defaultValue?: any;
  errorMessage?: string | boolean;
  isDisabled?: boolean;
  label?: string;
  onItemSelected?: (selected: T) => any;
  setFieldTouched: (name: any) => void;
  isLoading: boolean;
}

export const InputSelect = <T extends object>({
  errorMessage,
  getOptionLabel,
  isDisabled,
  label,
  onItemSelected,
  setFieldTouched,
  isLoading,
  ...props
}: Props<T>) => {
  return (
    <div className={`w-full flex flex-col gap-2`}>
      <div
        className={`text-xs font-bold ${
          isDisabled ? "text-customBlue-100" : "text-customBlue-500"
        } flex items-center`}
      >
        {label}
      </div>

      <Select
        {...props}
        isLoading={isLoading}
        placeholder={""}
        noOptionsMessage={() => "No hay opciones"}
        onChange={(value) => onItemSelected && onItemSelected(value as T)}
        onBlur={() => {
          setFieldTouched(props.name);
        }}
        classNames={{
          control: () =>
            `!h-7 !bg-white  !text-[#494949]  !rounded-xl !shadow-none !border !border-customBlue-500`,
          option: ({ isSelected }) =>
            `${
              isSelected
                ? "!bg-customBlue-50 !text-[#494949]"
                : "!bg-white !text-[#494949]"
            } font-medium !text-xs`,
          singleValue: () => "!text-[#494949] !text-xs",
        }}
      />

      <div className="-mt-1 flex justify-start flex-col">
        {errorMessage && (
          <span className="text-red-500  font-medium text-[9px]">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};
