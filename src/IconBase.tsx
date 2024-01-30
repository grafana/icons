import React, { SVGProps, forwardRef } from "react";
import { cx, css } from "@emotion/css";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "onLoad" | "onError" | "ref"> {
  size?: IconSize;
  title?: string;
  color?: string;
}

export const IconBase = forwardRef<SVGSVGElement, IconProps>(
  ({ color, title, size, className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color || "currentColor"}
      className={cx(
        css({
          display: "inline-block",
          fill: "currentColor",
          flexShrink: 0,
          label: "Icon",
          lineHeight: 0,
          verticalAlign: "middle",
        }),
        className,
      )}
      {...props}
    >
      {props.children}
    </svg>
  ),
);
