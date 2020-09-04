import { gql } from "@apollo/client";

type MeQueryArgs = Partial<{
  id: boolean;
  email: boolean;
  firstName: boolean;
  lastName: boolean;
}>;

type PostsQueryArgs = Partial<{
  id: boolean;
  title: boolean;
  content: boolean;
  author: boolean;
  votes: boolean;
}>;

export const ME_QUERY = ({
  id = true,
  email = true,
  firstName = true,
  lastName = true
}: MeQueryArgs = {}) => gql`
  {
    me {
      ${id ? "id" : ""}
      ${email ? "email" : ""}
      ${firstName ? "firstName" : ""}
      ${lastName ? "lastName" : ""}
    }
  }
`;

export const POSTS_QUERY = ({
  id = true,
  title = true,
  content = true,
  author = true,
  votes = true
}: PostsQueryArgs = {}) => gql`
  query Posts($authorId: String!) {
    posts(authorId: $authorId) {
      ${id ? "id" : ""}
      ${title ? "title" : ""}
      ${content ? "content" : ""}
      ${author ? "author" : ""}
      ${votes ? "votes" : ""}
    }
  }
`;
