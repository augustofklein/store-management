import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "muted";
  loading?: boolean;
};

const variantClasses: Record<string, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  muted: "bg-gray-200 hover:bg-gray-300 text-gray-800",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded text-sm font-medium inline-flex items-center justify-center";
  const classes = `${base} ${variantClasses[variant] || variantClasses.primary} ${className}`;

  return (
    <button disabled={disabled || loading} className={classes} {...rest}>
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
