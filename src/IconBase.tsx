import React from "react";
import type { SVGProps } from "react";
import { cx, css } from "@emotion/css";

export const IconBase = (props: SVGProps<SVGSVGElement>) => (
  <svg
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
);
