import React from "react";

interface IHeaderProps {
  title: string;
}

export const Header = ({ title }: IHeaderProps) => {
  return (
    <div className="jumbotron">
      <h1>Blog app</h1>
      <h2>{title}</h2>
    </div>
  );
};
