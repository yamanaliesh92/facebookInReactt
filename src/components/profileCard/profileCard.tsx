import "./profileCard.css";
import cover from "../../images/cover.jpeg";

import { MdEdit, MdDone } from "react-icons/md";

import React, { ChangeEvent, useContext, useState } from "react";
import { ContextUser } from "../../context/userContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  dateUpateUserName,
  IUpdateUserName,
  updateNameApi,
} from "../../axios/user/updateUserName.api";
import { AxiosErrors } from "../../axios/common.api";
import { getMe, MeDate } from "../../axios/user/me.api";
const ProfileCard = () => {
  const client = useQueryClient();
  const { data } = useContext(ContextUser);

  const [updateNameState, setUpdateNameState] = useState({
    username: data?.data.username,
  });

  const [editUserName, setEditUserName] = useState(false);

  const toggleEdit = () => {
    setEditUserName((prev) => !prev);
  };

  const onChangeUpdateName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateNameState({ username: e.target.value });
  };
  const { mutateAsync, error } = useMutation<
    dateUpateUserName,
    AxiosErrors,
    IUpdateUserName
  >("updateUserName", updateNameApi);

  const submitEditing = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = updateNameState.username;
    if (!value) return;
    await mutateAsync(
      { username: value },
      {
        onSuccess: () => {
          client.setQueryData("meQuery", {
            data: { ...data?.data, username: value },
          });
        },
      }
    );

    console.log("RRRRRRRRrrrrr");
    setEditUserName((prev) => !prev);
    console.log("ttttttttttttttttttttt");
  };

  const username = data?.data.username;
  const img = data?.data.image;
  const following = data?.data.follows.length;
  return (
    <div className="profileCard">
      {error && (
        <h1 style={{ color: "red" }}>{error.response?.data.message}</h1>
      )}
      <div className="protfileImg">
        <img src={cover} alt="cover" className="coverimg" />
        <img src={img} alt="head" className="headImg" />
        <div className="profileName">
          <div className="editName">
            {editUserName ? (
              <div>
                <input
                  value={updateNameState.username}
                  onChange={onChangeUpdateName}
                  className="infoInput"
                />
              </div>
            ) : (
              <span>{username}</span>
            )}
            {editUserName ? (
              <MdDone className="styleButtonEdit" onClick={submitEditing} />
            ) : (
              <MdEdit className="styleButtonEdit" onClick={toggleEdit} />
            )}
          </div>
          <span style={{ marginTop: "0.5rem" }}>ui ux</span>
        </div>
        <div className="followStatue">
          <hr />
          <div className="styleFollow">
            <div className="follow">
              <span>{following}</span>
              <span>followings</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>1</span>
              <span>followers</span>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
