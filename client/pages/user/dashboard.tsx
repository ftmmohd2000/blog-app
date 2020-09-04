import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ME_QUERY, POSTS_QUERY } from "../../gql/queries";
import { setPosts } from "../../redux/actions/post";
import { loginAction } from "../../redux/actions/user";
import { IPostData } from "../../redux/types";

const dashboard = () => {
  const dispatch = useDispatch();

  const [postList, setPostList] = useState([] as IPostData[]);
  const [loading, setLoading] = useState(true);

  const [meQuery, { called: c1, data: d1 }] = useLazyQuery(ME_QUERY());
  const [postsQuery, { called: c2, data: d2 }] = useLazyQuery(
    POSTS_QUERY({ author: false })
  );

  useEffect(() => {
    meQuery();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (c1 && d1) {
      dispatch(loginAction(d1.me));
      postsQuery({ variables: { authorId: d1.me.id } });
    }
  }, [c1, d1]);

  useEffect(() => {
    if (c2 && d2) {
      dispatch(setPosts(d2.posts));
      setPostList(d2.posts);
      setLoading(false);
    }
  }, [c2, d2]);

  return <DashboardComponent loading={loading} posts={postList} />;
};

interface DashboardComponentProps {
  loading: boolean;
  posts: IPostData[];
}

const DashboardComponent = ({ loading, posts }: DashboardComponentProps) => {
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        posts.map((post) => <p key={post.id}>{post.title}</p>)
      )}
    </div>
  );
};

export default dashboard;
