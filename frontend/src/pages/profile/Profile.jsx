import "./profile.css";
import { Topbar, Feed, Rightbar, Sidebar } from "../../components";
import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from 'react-router'
import { AccountCircle } from "@material-ui/icons"

const Profile = () => {
  const username = useParams().username
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  
  
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/users?username=${username}`);
      setUser(data);
    };
    fetchUser();
  }, []);

  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={PF+user.coverPicture || PF+'rolls-1.jpg'} alt="" className="profileCoverImg" />
              {
                user?.profilePicture ?
                <img src={PF+user.profilePicture} alt="" className="profileUserImg" />
                :<AccountCircle className = 'avatar'/>
              }
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username} </h4>
              <span className="profileInfoDesc"> {user.desc} </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username= {username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
