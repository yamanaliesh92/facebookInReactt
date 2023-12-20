import { Modal } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosErrors } from "../../../axios/common.api";
import {
  createFollowApi,
  DateCreateFollow,
  IPayloadCreateFollow,
} from "../../../axios/follow/createFollow.api";
import { getFollowApi } from "../../../axios/follow/getFollow.api";

import {
  DateGetAllUsers,
  getAllUserApi,
} from "../../../axios/user/getAllUser.api";

import cover from "../../../images/cover.jpeg";
import "./createFollowModel.css";

interface IPropsCreateFollowModel {
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatefollowModel: FC<IPropsCreateFollowModel> = ({
  openState,
  setOpenState,
}) => {
  const client = useQueryClient();

  const { data: dateGetFollow } = useQuery("getFollow", getFollowApi);

  const [pageState, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const [stateButton, setStateButton] = useState(true);

  const { data: dateGetAllUsers } = useQuery<DateGetAllUsers>(
    [
      "getAllUsers",
      {
        page: pageState,
      },
    ],
    async () => {
      return await getAllUserApi({
        page: pageState,
      });
    }
  );

  const { mutateAsync: mutateAsyncCreateFollow } = useMutation<
    DateCreateFollow,
    AxiosErrors,
    IPayloadCreateFollow
  >("createFollowApi", createFollowApi);

  const createFollow = async (followingId: number) => {
    await mutateAsyncCreateFollow(
      {
        followingId: followingId,
      },
      {
        onSuccess: (data) => {
          const cacheUpdate = [...(dateGetFollow?.data ?? []), data.data];
          console.log("ldlflfl", { cacheUpdate });
          client.setQueryData("getFollow", {
            data: cacheUpdate,
          });
        },
      }
    );
    setStateButton((prev) => !prev);
  };
  return (
    <Modal opened={openState} onClose={() => setOpenState(false)}>
      <>
        <div className="styleText">people who may know you </div>
        {dateGetAllUsers ? (
          <>
            {dateGetAllUsers.data.map((item) => {
              return (
                <div className="wrapeer">
                  <div className="styleContiner ">
                    <div className="styleInformationUser">
                      {item.image ? (
                        <img className="StyleImg" src={item.image} alt="im" />
                      ) : (
                        <img className="StyleImg" src={cover} alt="im" />
                      )}
                      <h1 className="styleUserName">{item.username}</h1>
                    </div>
                    <button
                      className="button"
                      onClick={() => createFollow(item.id)}
                    >
                      {stateButton ? "Follow" : "unFollow"}
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
        <div className="styleTwoButton">
          <button
            onClick={prevPage}
            disabled={pageState === 1}
            className="button"
          >
            prevButton
          </button>
          <button
            onClick={nextPage}
            className="button"
            disabled={!dateGetAllUsers?.data.length}
          >
            next Page
          </button>
        </div>
      </>
    </Modal>
  );
};

export default CreatefollowModel;
