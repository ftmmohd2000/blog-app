import React from "react";

interface IHeaderProps {
  title: string;
}

export const Header = ({ title }: IHeaderProps) => {
  return (
    <div>
      <h1>Blog app</h1>
      <h2>{title}</h2>
    </div>
  );
};
