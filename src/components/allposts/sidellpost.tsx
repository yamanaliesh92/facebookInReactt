import PostShare from "../postShare/postShare";
import AlllPost from "./allposts";
import "../postSide/postSide.css";
const PostSides = () => {
  return (
    <div className="postside">
      <PostShare />
      <AlllPost />
    </div>
  );
};
export default PostSides;
