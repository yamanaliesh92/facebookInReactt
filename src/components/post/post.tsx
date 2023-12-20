import React, { FC, useContext, useState } from "react";

import { FaComment } from "react-icons/fa";

import { IoIosShareAlt } from "react-icons/io";

import {
  AiFillLike,
  AiOutlineLike,
  AiFillEdit,
  AiOutlineSend,
} from "react-icons/ai";

import { TiDelete } from "react-icons/ti";

import "./post.css";
import { IResponsePost } from "../../axios/Post/getPost.api";
import { IPayloadUpdatePost } from "../../axios/Post/updatePost.api";
import { ContextUser } from "../../context/userContext";

interface IProps {
  items: IResponsePost;
  deletePost: (id: number) => Promise<void>;
  createLike: (postId: number) => Promise<void>;

  updatePost: (id: number, args: IPayloadUpdatePost) => Promise<void>;
}
const Post: FC<IProps> = ({ items, deletePost, updatePost, createLike }) => {
  const [edit, isEdit] = useState(false);

  const [value, setValue] = useState({ title: items.title });

  const [like, setLike] = useState(false);

  const changeLike = () => {
    setLike((prev) => !prev);
  };

  const { data: dateMe } = useContext(ContextUser);

  const ToggleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    isEdit((prev) => !prev);
  };

  return (
    <div className="post">
      <div className="crud">
        <TiDelete onClick={() => deletePost(items.id)} size={"1.8rem"} />
        <AiFillEdit onClick={ToggleEdit} size={"1.8rem"} />
      </div>
      <div className="detail">
        {edit ? (
          <div className="editStyle">
            <input
              className="infoInput"
              value={value.title}
              onChange={(e) => setValue({ ...value, title: e.target.value })}
            />

            <AiOutlineSend
              cursor={"pointer"}
              size={"1.8rem"}
              className="sendStyle"
              onClick={async (e) => {
                e.preventDefault();

                if (value?.title) {
                  await updatePost(items.id, { title: value.title });
                  isEdit(false);

                  return;
                }
              }}
            />
          </div>
        ) : (
          <span>
            <b>{items.title}</b>
          </span>
        )}
      </div>

      <span> {items.desc}</span>

      <img src={items.img} alt="imges" />

      <div className="postReact">
        <div className="option">
          {!like ? (
            <AiOutlineLike
              size={"1.6rem"}
              onClick={async (e) => {
                e.preventDefault();
                await createLike(items.id);
                setLike(!like);
              }}
            />
          ) : (
            <AiFillLike onClick={changeLike} size={"1.6rem"} />
          )}
        </div>
        <div className="option">
          <IoIosShareAlt size={"1.6rem"} />
        </div>
        <div className="option">
          <FaComment size={"1.6rem"} />
        </div>
      </div>

      <span className="likeStyle">{items.likes.length}</span>
    </div>
  );
};
export default Post;
