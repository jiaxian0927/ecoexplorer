interface ButtonProps {
  type?: "button" | "submit";
  cta: string;
  className: string;
  level: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  type = "button",
  cta,
  className,
  level,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`hover:cursor-pointer font-medium transition-all text-black border border-black hover:shadow-lg duration-200 hover:scale-105 ${
        level === "primary"
          ? "bg-green-400 hover:bg-green-300"
          : "bg-white hover:bg-gray-100"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {cta}
      {children}
    </button>
  );
};

export default Button;
