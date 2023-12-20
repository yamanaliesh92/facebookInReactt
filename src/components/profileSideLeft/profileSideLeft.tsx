import FollowCard from "../followCard/followCard";
import InfoCard from "../infoCard/infoCard";
import "../profilesSide/profileSide.css";
import RightSide from "../rightSide/rightSide";

const ProfileSideLeft = () => {
  return (
    <div className="profileSide">
      <RightSide />
      <InfoCard />
      <FollowCard />
    </div>
  );
};
export default ProfileSideLeft;
