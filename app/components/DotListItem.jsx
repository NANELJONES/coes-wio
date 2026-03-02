import React from "react";
import { FiCircle } from "react-icons/fi";

const wrapperClass = "flex items-center gap-2";
const iconClass = "w-2 h-2 shrink-0 fill-current";
const textClass = "m-0 text-sm !text-[1.3em] border-b border-primary_color md:text-base";

export default function DotListItem({ children, textClassName }) {
  return (
    <div className={wrapperClass}>
      <FiCircle className={iconClass} aria-hidden />
      <p className={textClassName != null ? textClassName : textClass}>{children}</p>
    </div>
  );
}
