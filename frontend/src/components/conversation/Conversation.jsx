import { useContext, useEffect, useState } from "react";

import "./Conversation.css";
import axios from "axios";
import { Avatar } from "@material-ui/core";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const { data } = await axios.get(`/users?userId=${friendId}`);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="conversation">
      {user?.profilePicture ? (
        <img src={PF+user.profilePicture} alt="" className="conversationImg" />
      ) : (
        <Avatar  />
      )}
      <span className="conversationName">{user?.username} </span>
    </div>
  );
};

export default Conversation;
