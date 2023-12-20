import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { infoDate, IPayloadCrateInfo } from "../../axios/info/createInfo.api";
import { IpayloadUpdate, updateInfoApi } from "../../axios/info/updateInfo.api";
import { Modal } from "@mantine/core";
import { getOwnInfoApi } from "../../axios/info/getOwnInfo.api";

interface IProps {
  setUpdate: Dispatch<SetStateAction<boolean>>;
  items: infoDate | undefined;
  update: boolean;
}

const UpdateComponent: FC<IProps> = ({ setUpdate, items, update }) => {
  if (!items?.data) throw Error;
  const init: IPayloadCrateInfo = {
    workAt: items?.data.workAt,
    livesIn: items?.data.livesIn,
    country: items.data.country,
    relationShip: items.data.relationShip,
  };

  const client = useQueryClient();
  const [editInfoCard, setEditInfoCard] = useState<IPayloadCrateInfo>(init);

  const onChangeInfoCard = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInfoCard((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { mutateAsync } = useMutation("updateInfoCard", updateInfoApi);

  const onSubmitInfoCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const Payload: IpayloadUpdate = {
      workAt: editInfoCard.workAt,
      country: editInfoCard.country,
      livesIn: editInfoCard.livesIn,
      relationShip: editInfoCard.relationShip,
    };

    await mutateAsync(Payload, {
      onSuccess: () => {
        client.setQueryData("getMyInfo", {
          data: {
            workAt: Payload.workAt,
            relationShip: Payload.relationShip,
            country: Payload.country,
            livesIn: Payload.livesIn,
          },
        });
      },
    });
    setUpdate(false);
  };

  return (
    <>
      <Modal opened={update} onClose={() => setUpdate(false)}>
        <form onSubmit={onSubmitInfoCard} className="infoForm">
          <div>
            <input
              type={"text"}
              onChange={onChangeInfoCard}
              value={editInfoCard.workAt}
              name="workAt"
              className="infoInput"
            />
          </div>
          <div>
            <input
              type={"text"}
              onChange={onChangeInfoCard}
              value={editInfoCard.livesIn}
              name="livesIn"
              className="infoInput"
            />
          </div>
          <div>
            <input
              type={"text"}
              onChange={onChangeInfoCard}
              name="country"
              value={editInfoCard.country}
              className="infoInput"
            />
          </div>
          <div>
            <input
              type={"text"}
              onChange={onChangeInfoCard}
              name="relationShip"
              value={editInfoCard.relationShip}
              className="infoInput"
            />
            <button className="button">update</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UpdateComponent;
