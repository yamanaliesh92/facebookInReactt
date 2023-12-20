import PostSides from "../../components/allposts/sidellpost";

import ProfileSide from "../../components/profilesSide/profileSide";
import RightSide from "../../components/rightSide/rightSide";
import "./home.css";
const Home = () => {
  return (
    <div className="home">
      <PostSides />
      <ProfileSide />
    </div>
  );
};
export default Home;
