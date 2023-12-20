import React, { FC, useContext, useState } from "react";

import { FaComment } from "react-icons/fa";

import filed from "../../images/cover.jpeg";

import { format } from "timeago.js";

import {
  AiFillLike,
  AiOutlineLike,
  AiFillEdit,
  AiOutlineSend,
} from "react-icons/ai";

import { TiDelete } from "react-icons/ti";

import "../post/post.css";

import { IResponseGetAllPost } from "../../axios/Post/getAllPost.api";
import Comments from "../comment/comment";
import { ContextUser } from "../../context/userContext";

interface IProps {
  items: IResponseGetAllPost;
}
const Post: FC<IProps> = ({ items }) => {
  const [commentState, setCommentState] = useState(false);

  const { data: dataMe } = useContext(ContextUser);

  const toggleComment = () => {
    setCommentState((prev) => !prev);
  };
  const [edit, isEdit] = useState(false);

  const [value, setValue] = useState({ title: items.title });

  const [like, setLike] = useState(false);

  const changeLike = () => {
    setLike((prev) => !prev);
  };

  const ToggleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    isEdit((prev) => !prev);
  };
  const username = items.user.username;
  const imgUser = items.user.image;
  const timeCreatePost = items.createAt;
  return (
    <div className="post">
      <div className="styleTop">
        <div className="styleInformation">
          {imgUser ? (
            <img src={imgUser} alt="imgUser" className="StyleImg" />
          ) : (
            <img src={filed} alt="fake" className="StyleImg" />
          )}
          <div className="styledetailsUser">
            <h1>{username}</h1>
            <h2 className="timeAt">{format(timeCreatePost)}</h2>
          </div>
        </div>
        <div className="crud">
          {dataMe?.data.id === items.userId ? (
            <TiDelete size={"1.8rem"} />
          ) : null}
          {dataMe?.data.id === items.userId ? (
            <AiFillEdit onClick={ToggleEdit} size={"1.8rem"} />
          ) : null}
        </div>
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
            />
          </div>
        ) : (
          <span>
            <b>{items.title}</b>
          </span>
        )}
      </div>

      <span> {items.desc}</span>

      <img src={items.img} alt="imges" className="" />

      <div className="postReact">
        <div className="option">
          {!like ? (
            <AiOutlineLike size={"1.6rem"} />
          ) : (
            <AiFillLike onClick={changeLike} size={"1.6rem"} />
          )}
        </div>
        <div className="option">
          <FaComment size={"1.6rem"} onClick={toggleComment} />
        </div>
      </div>

      {items.likes ? (
        <span className="likeStyle">{items.likes.length}</span>
      ) : null}

      {commentState ? (
        <Comments postId={items.id} userIdPost={items.userId} />
      ) : null}
    </div>
  );
};
export default Post;
