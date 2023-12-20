import Posts from "../posts/posts";
import PostShare from "../postShare/postShare";
import "./postSide.css";
const PostSide = () => {
  return (
    <div className="posts">
      <PostShare />
      <Posts />
    </div>
  );
};
export default PostSide;
