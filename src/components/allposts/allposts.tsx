import { useEffect } from "react";
import { useQuery } from "react-query";

import {
  getAllPostsApi,
  GetPostDateApi,
} from "../../axios/Post/getAllPost.api";
import "../post/post.css";
import Post from "./PostsAll";

const AllPost = () => {
  const { data: dataGetAllPost } = useQuery<GetPostDateApi>(
    "dateGetAllPost",
    getAllPostsApi
  );

  useEffect(() => {
    console.log("DATAALLPOST", dataGetAllPost);
  }, [dataGetAllPost]);

  return (
    <div className="posts">
      {dataGetAllPost?.data?.map((item) => {
        return <Post items={item} />;
      })}
    </div>
  );
};
export default AllPost;
