import "./topbar.css";
import {
  Search,
  Person,
  Chat,
  Notifications,
  PermIdentity,
  AccountCircle,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router";
import axios from "axios";
import SearchBar from "../Search/Search";

const Topbar = () => {
  const [searchUser, setSearchUser] = useState([]);
  const search = useRef();

  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = search.current.value;
    if (searchTerm) {
      try {
        const { data } = await axios.get(`/users?username=${searchTerm}`);
        setSearchUser([...searchUser, data]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  console.log(searchUser)

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" className="link">
            <span className="logo">Social Connect</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <form className="searchbar" onSubmit={handleSubmit}>
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              type="text"
              className="searchInput"
              onKeyPress={handleKeyPress}
              ref={search}
            />
            <button style={{ display: "none" }} type="submit">
              search
            </button>
          </form>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">3</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">4</span>
            </div>
          </div>
          {user.profilePicture ? (
            <img src={PF + user.profilePicture} alt="" className="topbarImg" />
          ) : (
            <AccountCircle size="large" />
          )}
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
      
        
     {
       searchUser.map((user)=>(
         <SearchBar searchUser = {user} setSearchUser = {setSearchUser} />
       ))
     }
      
      
    </>
  );
};

export default Topbar;
