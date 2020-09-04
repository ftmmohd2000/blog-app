import React from "react";
import { useRouter } from "next/router";

const SingularPost = () => {
  const { id } = useRouter().query;

  return (
    <div>
      <p>sup {id}</p>
    </div>
  );
};

export default SingularPost;
