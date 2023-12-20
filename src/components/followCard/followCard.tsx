import "./followCard.css";

import covver from "../../images/cover.jpeg";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DateGetFollow, getFollowApi } from "../../axios/follow/getFollow.api";
import { AxiosErrors } from "../../axios/common.api";
import { useEffect, useState } from "react";
import {
  DateDeleteFollow,
  deleteFollow,
  IPayloadDeleteFollow,
} from "../../axios/follow/deleteFollow.api";

import CreatefollowModel from "../model/createFollowModel/createFollowModel";
const FollowCard = () => {
  const client = useQueryClient();

  const [openModal, setOpenModal] = useState(false);

  const toToggleFriend = () => {
    setOpenModal((prev) => !prev);
  };
  const { data: dateGetFollow } = useQuery<DateGetFollow, AxiosErrors>(
    "getFollow",
    getFollowApi
  );

  const { mutateAsync: mutateDeleteFollow } = useMutation<
    DateDeleteFollow,
    AxiosErrors,
    IPayloadDeleteFollow
  >("deleteFollow", deleteFollow);

  const removeFollow = async (id: number) => {
    const result = dateGetFollow?.data;
    if (!result) return;
    const filleter = result.filter((it) => it.id !== id);
    await mutateDeleteFollow(
      { id: id },
      {
        onSuccess: () => {
          client.setQueryData("getFollow", { data: filleter });
        },
      }
    );
  };
  return (
    <div className="followCard">
      <div className="text">who is Following you</div>
      {dateGetFollow ? (
        <>
          {dateGetFollow?.data.map((item) => {
            return (
              <div className="follwers">
                <div>
                  {item.following.image ? (
                    <img
                      src={item.following.username}
                      alt="ff"
                      className="followingImg"
                    />
                  ) : (
                    <img src={covver} alt="ff" className="followingImg" />
                  )}

                  <div className="name">
                    <span>{item.following.username}</span>
                  </div>
                </div>
                <button
                  type={"submit"}
                  onClick={() => removeFollow(item.id)}
                  className="button"
                >
                  unFollow
                </button>
              </div>
            );
          })}
        </>
      ) : null}
      {!dateGetFollow?.data.length ? (
        <div className="styleNoFreind">
          <h1 className="titleStyle">no one Following you ... </h1>
          <button onClick={toToggleFriend} className="button butt">
            {openModal ? (
              <CreatefollowModel
                openState={openModal}
                setOpenState={setOpenModal}
              />
            ) : null}
            add friend
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default FollowCard;
