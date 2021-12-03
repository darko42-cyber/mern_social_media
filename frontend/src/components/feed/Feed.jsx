import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import API from "../../Axios";
import { AuthContext } from "../../context/AuthContext";
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = username
        ? await API.get(`posts/profile/${username}`)
        : await API.get(`posts/timeline/${user._id}`);
      setPosts(
        data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
