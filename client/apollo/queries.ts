import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;
