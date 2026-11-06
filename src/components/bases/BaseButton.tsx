import React from "react";
import { Loader2 } from "lucide-react";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<BaseButtonProps["variant"]>, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent shadow-sm",
  secondary:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400 border-transparent",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent shadow-sm",
  ghost:
    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent",
};

const sizeStyles: Record<NonNullable<BaseButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2 text-sm rounded-md",
  lg: "px-5 py-2.5 text-base rounded-lg",
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  fullWidth = false,
  startIcon,
  endIcon,
  disabled,
  className = "",
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {startIcon && <span className="mr-2 inline-flex items-center shrink-0">{startIcon}</span>}
          <span>{children}</span>
          {endIcon && <span className="ml-2 inline-flex items-center shrink-0">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default BaseButton;
