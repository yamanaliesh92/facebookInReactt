import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { createLikeApi } from "../../axios/like/createLike.api";

import { deletePostApi } from "../../axios/Post/deletePost.api";
import { getAllPostsApi } from "../../axios/Post/getAllPost.api";
import { getPostApi, GetPostDateApi } from "../../axios/Post/getPost.api";
import {
  IPayloadUpdatePost,
  updatePostApi,
} from "../../axios/Post/updatePost.api";

import Post from "../post/post";
import "./posts.css";

const Posts = () => {
  const { data } = useQuery<GetPostDateApi>("getPost", getPostApi);
  const client = useQueryClient();

  const { mutateAsync } = useMutation("deltePost", deletePostApi);

  const { mutateAsync: mutateUpdate } = useMutation(
    "updatePost",
    updatePostApi
  );

  useEffect(() => {
    if (!data) return;
    console.log("dateGetPost", data);
  }, [data]);

  const handleUpdate = async (id: number, args: IPayloadUpdatePost) => {
    await mutateUpdate(
      { id, title: args.title },
      {
        onSuccess: () => {
          const cachedData = data?.data;
          if (!cachedData) return;
          const updatedItem = cachedData.find((t) => t.id === id);

          if (!updatedItem) return;
          const indexOf = cachedData.indexOf(updatedItem);
          cachedData[indexOf] = {
            ...updatedItem,
            title: args.title,
          };
          client.setQueryData("dateGetPost", { data: cachedData });
        },
      }
    );
  };

  const filleter = async (id: number) => {
    const dateFilleter = data?.data.filter((item) => item.id !== id);
    await mutateAsync(id, {
      onSuccess: () => {
        client.setQueryData("dateGetPost", { data: dateFilleter });
      },
    });
  };

  const { mutate: mutateCreateLike } = useMutation("createLike", createLikeApi);

  const handelCreateLike = async (postId: number) => {
    await mutateCreateLike({ postId: postId });
  };

  return (
    <div className="posts">
      {data?.data?.map((item) => {
        return (
          <Post
            items={item}
            createLike={handelCreateLike}
            deletePost={filleter}
            updatePost={handleUpdate}
          />
        );
      })}
    </div>
  );
};
export default Posts;
