import { useQuery } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/user";
import { ME_QUERY } from "../../gql/queries";

const dashboard = () => {
  const { data, loading, error } = useQuery(ME_QUERY);
  const dispatch = useDispatch();

  if (loading) {
    return <div>wait</div>;
  } else if (error) {
    return <div>error</div>;
  }

  dispatch(loginAction(data.me));
  return <div>we dun did it</div>;
};

export default dashboard;
