import "./post.css";
import {
  AccountCircle,
  Favorite,
  MoreVert,
  ThumbUpAlt,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({});

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/users?userId=${post.userId}`);
      setUser(data);
      console.log(user);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    try {
      axios.put(`posts/${post._id}/likes`, { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              {user.profilePicture ? (
                <img
                  src={PF + user.profilePicture}
                  alt=""
                  className="postProfileImg"
                />
              ) : (
                <AccountCircle />
              )}
            </Link>
            <span className="postUsername"> {user.username}</span>
            <span className="postDate"> {format(post.createdAt)} </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText"> {post?.desc} </span>
          <img src={PF + post.image} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <IconButton onClick={likeHandler}>
              <ThumbUpAlt htmlColor="blue" className="likeIcon" />
            </IconButton>
            <IconButton onClick={likeHandler}>
              <Favorite htmlColor="red" className="likeIcon" />
            </IconButton>
            <span className="postLikeConter"> {like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> {post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
