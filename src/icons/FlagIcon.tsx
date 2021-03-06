import React from "react";

export default function FlagIcon(props) {
  const { size } = props;
  return (
    <svg
      id="Bold"
      enableBackground="new 0 0 24 24"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="Crimson"
    >
      <path d="m2 0c-.55 0-1 .45-1 1v22c0 .55.45 1 1 1s1-.45 1-1v-10.05c1.24-.78 4.01-2.02 8.03-.8 6.46 1.96 11.63-5.66 11.84-5.98.18-.26.17-.6-.01-.86-.18-.25-.51-.37-.81-.28-.05.01-5.21 1.37-9.87-1.89-3.27-2.29-7.14-2.3-9.18-2.09v-.05c0-.55-.45-1-1-1z" />
    </svg>
  );
}
