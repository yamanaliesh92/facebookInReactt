import "./infoCard.css";
import { BiPencil } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Modeles from "../model/model";
import { ContextUser } from "../../context/userContext";
import { removeToken } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getOwnInfoApi } from "../../axios/info/getOwnInfo.api";
import { infoDate } from "../../axios/info/createInfo.api";
import UpdateComponent from "../update/update";

const InfoCard = () => {
  const [modelOpen, setModelled] = useState<boolean>(false);
  const { logout } = useContext(ContextUser);
  const navigate = useNavigate();

  const [updateState, setUpdateState] = useState(false);

  const toggle = () => {
    setUpdateState((prev) => !prev);
  };

  const { data } = useQuery<infoDate>("getMyInfo", getOwnInfoApi);

  useEffect(() => {
    if (!data?.data) return;
    console.log("DAteInfo", data);
  }, [data]);

  const LogoutUser = () => {
    removeToken("MyToken");
    logout();
    navigate("/auth");
  };
  return (
    <div className="infoCard">
      <div className="infohead">
        <h4 data-testid="d">your info</h4>
        <div>
          <BiPencil onClick={() => setModelled(true)} />
        </div>
        {modelOpen ? <Modeles open={modelOpen} setOpen={setModelled} /> : null}
      </div>
      <div className="info">
        <span>
          <b data-testid="work">works at: </b>
        </span>
        {data?.data.workAt ? <span>{data?.data.workAt}</span> : null}
      </div>
      <div className="info">
        <span>
          <b data-testid="live in">Lives in: </b>
        </span>
        {data?.data.livesIn ? <span>{data?.data.livesIn}</span> : null}
      </div>
      <div className="info">
        <span>
          <b data-testid="country">country: </b>
        </span>
        {data?.data.country ? <span>{data?.data.country}</span> : null}
      </div>
      <div className="info">
        <span>
          <b data-testid="status">statue: </b>
        </span>
        {data?.data.relationShip ? (
          <span>{data?.data.relationShip}</span>
        ) : null}
      </div>

      <div className="styleButtons">
        {data?.data ? null : (
          <button
            className="button createInfo"
            onClick={() => setModelled(true)}
          >
            write MyOwnInfo
          </button>
        )}
        <div
          className="button logout-button"
          data-testid="logout"
          onClick={LogoutUser}
        >
          Logout
        </div>
      </div>
      <button
        onClick={toggle}
        data-testid="update"
        className="button createInfo"
      >
        update
      </button>
      {updateState ? (
        <UpdateComponent
          items={data}
          update={updateState}
          setUpdate={setUpdateState}
        />
      ) : null}
    </div>
  );
};
export default InfoCard;
