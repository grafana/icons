import React, { SVGProps, forwardRef } from "react";
import { cx, css } from "@emotion/css";

export const IconBase = forwardRef<SVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.color || "currentColor"}
      className={cx(
        css({
          display: "inline-block",
          fill: "currentColor",
          flexShrink: 0,
          label: "Icon",
          lineHeight: 0,
          verticalAlign: "middle",
        }),
        props.className,
      )}
      {...props}
    >
      {props.children}
    </svg>
  ),
);
