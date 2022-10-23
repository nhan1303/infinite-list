import React from "react";

export interface IIfProps {
  condition: boolean;
  children: React.ReactNode;
}

export const If: React.FC<IIfProps> = ({ condition, children }) => {
  if (!condition) return null;

  return <>{children}</>;
};

export default If;
