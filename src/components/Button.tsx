import React from "react";

export default function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className="bg-tertiary text-white p-4 rounded-md" onClick={onClick}>
      {children}
    </button>
  );
}
