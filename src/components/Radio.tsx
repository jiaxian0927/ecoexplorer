import { createContext, useContext, ReactNode } from "react";

type RadioContextType = {
  value: string; // Currently selected value
  onChange: (value: string) => void; // Selection handler
  name: string; // Group name for form submission
};

const RadioContext = createContext<RadioContextType | undefined>(undefined);

type RadioProps = {
  children: ReactNode;
  value: string;
  disabled?: boolean;
};

export function Radio({ children, value, disabled = false }: RadioProps) {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("Radio must be used within a RadioGroup");
  }

  // Extract needed values from context
  const { value: selectedValue, onChange, name } = context;

  return (
    <div>
      <input
        type="radio"
        id={`${name}-${children}`}
        className="sr-only" // Screen-reader only (better than hidden)
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        name={name}
        disabled={disabled}
      />
      <label
        htmlFor={`${name}-${children}`}
        className="flex flex-row items-center gap-3 cursor-pointer"
      >
        <span
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
        ${selectedValue === value ? "border-blue-500" : "border-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {selectedValue === value && (
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          )}
        </span>
        <p
          className={`select-none text-black font-light ${
            disabled ? "opacity-50" : ""
          }`}
        >
          {children}
        </p>
      </label>
    </div>
  );
}

type RadioGroupProps = {
  children: ReactNode;
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
};

export function RadioGroup({
  children,
  value,
  onChange,
  name,
  className = "",
}: RadioGroupProps) {
  return (
    <RadioContext.Provider value={{ value, onChange, name }}>
      <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
    </RadioContext.Provider>
  );
}
