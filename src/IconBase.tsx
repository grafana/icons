import React, { SVGProps, forwardRef } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "onLoad" | "onError" | "ref"> {
  size?: IconSize;
  title?: string;
  color?: string;
}

function getSvgSize(size: IconSize) {
  const sizeMap = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 36,
    xxxl: 48,
  };

  return sizeMap[size] || 16;
}

export const IconBase = forwardRef<SVGSVGElement, IconProps>(
  (
    { color = "currentColor", title, size = "md", className, ...props },
    ref,
  ) => {
    const svgSize = getSvgSize(size);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={svgSize}
        width={svgSize}
        style={{
          display: "inline-block",
          fill: color,
          flexShrink: 0,
          lineHeight: 0,
          verticalAlign: "middle",
        }}
        className={className}
        {...props}
      >
        {title && <title>{title}</title>}
        {props.children}
      </svg>
    );
  },
);
