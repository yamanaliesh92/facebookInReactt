import PostSide from "../postSide/postSide";
import ProfileCard from "../profileCard/profileCard";
import ProfileSideLeft from "../profileSideLeft/profileSideLeft";

import "./profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <ProfileSideLeft />
      <div className="profileCenter">
        <ProfileCard />
        <PostSide />
      </div>
    </div>
  );
};
export default Profile;
