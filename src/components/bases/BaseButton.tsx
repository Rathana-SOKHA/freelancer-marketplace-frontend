import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

export interface BaseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "small" | "middle" | "large";
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

// Map custom variant to Ant Design Button props
function getAntdVariantProps(variant: BaseButtonProps["variant"]): {
  type: ButtonProps["type"];
  danger?: boolean;
  ghost?: boolean;
} {
  switch (variant) {
    case "primary":
      return { type: "primary" };
    case "danger":
      return { type: "primary", danger: true };
    case "outline":
    case "secondary":
      return { type: "default" };
    case "ghost":
      return { type: "text" };
    case "link":
      return { type: "link" };
    default:
      return { type: "primary" };
  }
}

// Map custom size to Ant Design size
function getAntdSize(size: BaseButtonProps["size"]): ButtonProps["size"] {
  switch (size) {
    case "sm":
    case "small":
      return "small";
    case "lg":
    case "large":
      return "large";
    case "md":
    case "middle":
    default:
      return "middle";
  }
}

export function BaseButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  fullWidth = false,
  startIcon,
  endIcon,
  type = "button",
  disabled = false,
  className = "",
  onClick,
  ...rest
}: BaseButtonProps) {
  const antdVariant = getAntdVariantProps(variant);
  const antdSize = getAntdSize(size);

  return (
    <Button
      type={antdVariant.type}
      danger={antdVariant.danger}
      ghost={antdVariant.ghost}
      size={antdSize}
      loading={loading}
      block={fullWidth}
      htmlType={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
      icon={startIcon}
      {...(rest as Record<string, unknown>)}
    >
      {loading && loadingText ? (
        loadingText
      ) : (
        <>
          {children}
          {endIcon && <span className="ml-1 inline-flex items-center">{endIcon}</span>}
        </>
      )}
    </Button>
  );
}

export default BaseButton;
