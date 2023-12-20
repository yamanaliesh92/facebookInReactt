import "./comment.css";
import { AiOutlineSend } from "react-icons/ai";
import React, { ChangeEvent, FC, useContext, useState } from "react";
import {
  getAllComments,
  getAllCommentsDate,
} from "../../axios/comment/getAllCommentByPostId.api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { format } from "timeago.js";

import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";

import filed from "../../images/cover.jpeg";
import { deleteCommentsApi } from "../../axios/comment/deleteComment.api";
import { AxiosErrors } from "../../axios/common.api";
import {
  createComment,
  DateResCreateComment,
  IPaylodCreateComment,
} from "../../axios/comment/createComment.api";
import { ContextUser } from "../../context/userContext";
import {
  DateUpdateComment,
  IUpdateComment,
  updateCommentApi,
} from "../../axios/comment/updateComment.api";
import UpdateComment from "../update/updateComment";

interface IPayload {
  title: string;
}
const init: IPayload = {
  title: "",
};

interface IProps {
  userIdPost: number;
  postId: number;
}
const Comments: FC<IProps> = ({ postId, userIdPost }) => {
  const [value, setValue] = useState<IPayload>(init);

  const [editingState, setEditingForm] = useState({ id: 0, editing: false });

  const toggleEdit = (id: number) => {
    setEditingForm((rev) => ({ id, editing: !rev.editing }));
  };

  const client = useQueryClient();

  const { mutateAsync: mutateCreateComment, error } = useMutation<
    DateResCreateComment,
    AxiosErrors,
    IPaylodCreateComment
  >("createComment", createComment);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ title: e.target.value });
  };

  const {
    mutateAsync: mutateUpdateComment,

    isLoading: isLoadingUpdateComment,
  } = useMutation<DateUpdateComment, AxiosErrors, IUpdateComment>(
    "updateComment",
    updateCommentApi
  );

  const { data: dataMe } = useContext(ContextUser);

  const { mutateAsync } = useMutation("deleteComment", deleteCommentsApi);

  const { data: dateComment } = useQuery<getAllCommentsDate>(
    ["getAllComment"],
    () => getAllComments(postId)
  );

  const deleteComment = async (id: number) => {
    const remove = dateComment?.data.filter((t) => t.id !== id);
    console.log("dd", remove);

    await mutateAsync(id, {
      onSuccess: () => {
        client.setQueryData("getAllComment", { data: remove });
      },
    });
  };

  const updateTitleComment = async (id: number, title: string) => {
    await mutateUpdateComment(
      { id, title },
      {
        onSuccess: () => {
          const cacheData = dateComment?.data;
          if (!cacheData) return;
          const updateItem = cacheData.find((t) => t.id === id);
          if (!updateItem) return;
          const indexOf = cacheData.indexOf(updateItem);
          cacheData[indexOf] = { ...updateItem, title };
          client.setQueryData("getAllComment", { data: cacheData });
        },
      }
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userID = dataMe?.data.id;
    if (!userID) return;
    const body: IPaylodCreateComment = {
      userId: userID,
      postId: postId,
      title: value.title,
    };
    setValue(init);
    await mutateCreateComment(body, {
      onSuccess: (data) => {
        const cacheDate = [...(dateComment?.data ?? []), data.data];
        client.setQueryData("getAllComment", { data: cacheDate });
      },
    });
  };

  return (
    <div className="comment">
      {dateComment
        ? dateComment.data.map((it) => {
            const time = it.createAt;
            return (
              <div className="commentContiner" key={it.id}>
                {error && (
                  <h1 style={{ textAlign: "center", color: "red" }}>
                    {error.message}
                  </h1>
                )}
                <div data-testid="allComment" className="commentTitle">
                  {it.user.image ? (
                    <img
                      src={it.user.image}
                      alt="photoUser"
                      className="StyleImg"
                    />
                  ) : (
                    <img src={filed} alt="notPhoto" className="StyleImg" />
                  )}
                  <h1>{it.user.username}</h1>
                </div>
                <div className="cards">
                  <div>
                    <h1 className="styleCreateAt">for: {format(time)}</h1>
                    <h1 className="styleTitle">{it.title}</h1>
                  </div>
                  <div className="actionStyle">
                    {it.userId === dataMe?.data.id ||
                    dataMe?.data.id === userIdPost ? (
                      <TiDelete
                        size={"1.3rem"}
                        style={{ cursor: "pointer", marginRight: "0.3rem" }}
                        onClick={() => deleteComment(it.id)}
                      />
                    ) : null}
                    {it.userId === dataMe?.data.id ? (
                      <MdEdit
                        onClick={() => toggleEdit(it.id)}
                        style={{ cursor: "pointer", marginRight: "0.3rem" }}
                      />
                    ) : null}
                  </div>
                  {editingState.editing && editingState.id === it.id ? (
                    <UpdateComment
                      detailsComment={it}
                      updateCommentTitle={updateTitleComment}
                      setEditingForm={setEditingForm}
                      editingState={editingState}
                      isLoading={isLoadingUpdateComment}
                    />
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
      {dateComment?.data.length === 0 ? "no comment in this post" : null}
      <form onSubmit={onSubmit}>
        <div className="styleForm">
          <input
            placeholder="write your comment"
            value={value.title}
            onChange={onChange}
            type={"text"}
            className="infoInput input"
          />
          <button type={"submit"}>
            <AiOutlineSend className="styleSendIcon" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default Comments;
