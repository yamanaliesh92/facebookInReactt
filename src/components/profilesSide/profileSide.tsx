import FollowCard from "../followCard/followCard";
import ProfileCard from "../profileCard/profileCard";
import RightSide from "../rightSide/rightSide";
import "./profileSide.css";
const ProfileSide = () => {
  return (
    <div className="profileSide">
      <RightSide />
      <ProfileCard />
      <FollowCard />
    </div>
  );
};
export default ProfileSide;
