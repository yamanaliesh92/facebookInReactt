import "./rightSide.css";

import { FiSettings } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";

import { BiLogIn } from "react-icons/bi";

import { SlUserFollow } from "react-icons/sl";

import { useContext, useState } from "react";
import ShareModels from "../shareModel/shareModel";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../../context/userContext";
import { removeToken } from "../../utils/cookie";
import CreatefollowModel from "../model/createFollowModel/createFollowModel";

const RightSide = () => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const [profileState, setProfileState] = useState(false);

  const [followState, setFollowState] = useState(false);

  const changeFollowState = () => {
    setFollowState((prev) => !prev);
  };

  const navigate = useNavigate();

  const { logout } = useContext(ContextUser);

  const Logout = () => {
    removeToken("MyToken");
    logout();
    navigate("/auth");
  };

  const toHome = () => {
    navigate("/");
    setProfileState((prev) => !prev);
  };

  const toggle = () => {
    navigate("/Myhome");
    setProfileState((prev) => !prev);
  };

  return (
    <div className="rightside">
      <div className="navLink">
        {profileState ? (
          <AiFillHome
            style={{ marginRight: "14px" }}
            onClick={toHome}
            size={"1.5rem"}
            cursor="pointer"
          />
        ) : (
          <CgProfile
            style={{ marginRight: "14px" }}
            size={"1.5rem"}
            onClick={toggle}
            cursor="pointer"
          />
        )}

        <BiLogIn
          style={{ marginRight: "14px" }}
          onClick={Logout}
          size={"1.5rem"}
          cursor="pointer"
        />

        <FiSettings
          style={{ marginRight: "14px" }}
          onClick={toHome}
          cursor="pointer"
          size={"1.5rem"}
        />

        <SlUserFollow
          cursor="pointer"
          onClick={changeFollowState}
          size={"1.5rem"}
        />
      </div>

      {followState ? (
        <CreatefollowModel
          openState={followState}
          setOpenState={setFollowState}
        />
      ) : null}

      {modelOpen ? (
        <ShareModels open={modelOpen} setOpen={setModelOpen} />
      ) : null}
    </div>
  );
};
export default RightSide;
