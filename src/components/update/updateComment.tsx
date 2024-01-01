import React, { ChangeEvent, FC, useState } from "react";
import { IResponse } from "../../axios/comment/getAllCommentByPostId.api";
import { Modal } from "@mantine/core";

interface IEditingState {
  id: number;
  editing: boolean;
}

interface IProps {
  detailsComment: IResponse;
  isLoading: boolean;
  updateCommentTitle: (id: number, title: string) => Promise<void>;
  editingState: IEditingState;
  setEditingForm: React.Dispatch<
    React.SetStateAction<{
      id: number;
      editing: boolean;
    }>
  >;
}

const UpdateComment: FC<IProps> = ({
  detailsComment,
  updateCommentTitle,
  setEditingForm,
  editingState,
  isLoading,
}) => {
  const [titleState, setTitleState] = useState({ title: detailsComment.title });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleState({ title: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCommentTitle(detailsComment.id, titleState.title);
    setEditingForm((prev) => {
      return {
        ...prev,
        editing: !prev.editing,
      };
    });
  };

  const closeModel = () => {
    setEditingForm((prev) => {
      return {
        ...prev,
        editing: false,
      };
    });
  };
  return (
    <Modal opened={editingState.editing} onClose={closeModel}>
      <form onSubmit={onSubmit} className="infoForm">
        <div>
          <input
            className="infoInput input"
            onChange={onChange}
            value={titleState.title}
          />
        </div>
        <button className="button" type={"submit"}>
          {isLoading ? "updating" : "update"}
        </button>
      </form>
    </Modal>
  );
};

export default UpdateComment;
