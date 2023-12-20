import { Modal } from "@mantine/core";
import React, { ChangeEvent, FC, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosErrors } from "../../axios/common.api";
import {
  crateInfoApi,
  infoDate,
  IPayloadCrateInfo,
} from "../../axios/info/createInfo.api";
interface Iprops {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const init: IPayloadCrateInfo = {
  workAt: "",
  country: "",
  livesIn: "",
  relationShip: "",
};

const Modeles: FC<Iprops> = ({ setOpen, open }) => {
  const [infoCard, setInfoCard] = useState<IPayloadCrateInfo>(init);

  const { mutateAsync } = useMutation<infoDate, AxiosErrors, IPayloadCrateInfo>(
    "crateInfo",
    crateInfoApi
  );

  const onChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setInfoCard((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadCrateInfo = {
      workAt: infoCard.workAt,
      livesIn: infoCard.livesIn,
      country: infoCard.country,
      relationShip: infoCard.relationShip,
    };
    const { data } = await mutateAsync(body);
    console.log("infoCard", data);
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmitInfo} className="infoForm">
          <h3>your info</h3>

          <div>
            <input
              type={"text"}
              placeholder="work at"
              onChange={onChangeInfo}
              name="workAt"
              className="infoInput"
            />
          </div>
          <div>
            <input
              type={"text"}
              onChange={onChangeInfo}
              name="livesIn"
              placeholder="lives in"
              className="infoInput"
            />
          </div>
          <div>
            <input
              type={"text"}
              onChange={onChangeInfo}
              name="country"
              placeholder="country"
              className="infoInput"
            />
          </div>
          <div>
            <input
              type={"text"}
              onChange={onChangeInfo}
              name="relationShip"
              placeholder="relationShip status "
              className="infoInput"
            />
            <button className="button">update</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Modeles;
