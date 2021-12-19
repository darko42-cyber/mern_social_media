import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import API from '../../Axios'
import { users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const Rightbar = ({ user }) => {
  const [follow, setFollow] = useState(false);
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
 

  const handleClick = async () => {
    try {
      if(follow){
        await API.put(`users/${user._id}/unfollow`,{userId: currentUser._id})
      }else{
        await API.put(`users/${user._id}/follow`,{userId: currentUser._id})

      }
    } catch (error) {
      console.log(error)
    }
    setFollow(!follow)
  };

  const HomeRightbar = () => {
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/rolls-9.jpg" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 others </b> have a birthday today
          </span>
        </div>
        <img src="/assets/tesla-1.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle"> Online friends </h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? (
              <Remove fontSize="small" htmlColor="blue" />
            ) : (
              <Add fontSize="small" htmlColor="blue" />
            )}
          </button>
        )}

        <h4 className="rightbarTitle"> User information </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue"> {user.city} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue"> {user.from} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue"> {user.relationship} </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={PF + friend.profilePicture}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">John Cater</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
