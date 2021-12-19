
import {Avatar} from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./search.css";
import axios from 'axios'
import API from '../../Axios'

const SearchBar = ({ searchUser, setSearchUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [follow, setFollow] = useState(false);
  // const [friends, setFriends] = useState([]);


  // const { user: currentUser } = useContext(AuthContext);
  

  // useEffect(() => {
  //   setFollow(currentUser.followings.includes(user?._id));
  // }, [currentUser, user?._id]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("/users/friends/" + user._id);
  //       setFriends(friendList.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getFriends();
  // }, [user?._id]);

  
  // const handleClick = async () => {
  //   try {
  //     if(follow){
  //       await API.put(`users/${user._id}/unfollow`,{userId: currentUser._id})
  //     }else{
  //       await API.put(`users/${user._id}/follow`,{userId: currentUser._id})

  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setFollow(!follow)
  // };


  
  return (
    <>
        <div className="searchContainer" onClick = {()=> setSearchUser([])}>
          <div style={{ textAlign: "center" }}>
            {" "}
            {searchUser ? "Result found 1" : "No results found"}{" "}
          </div>
          <div className="searchItems">
            <ul className="searchModal">
              <li>
                <Link to = {`/profile/${searchUser.username}`}>
                {searchUser?.profilePicture ? (
                  <img src={PF + searchUser?.profilePicture} alt="" />
                ) : (
                  <Avatar />
                )}
                </Link>
              </li>
              <li>{searchUser?.username}</li>
            </ul>
            <div className="searchAction">
            <button className="rightbarFollowButton" >
            {follow ? "Unfollow" : "Follow"}
            {follow ? (
              <Remove fontSize="small" htmlColor="blue" />
            ) : (
              <Add fontSize="small" htmlColor="blue" />
            )}
          </button>
            </div>
          </div>
          <hr className="hr" />
        </div>
            
    </>
  );
};

export default SearchBar;
