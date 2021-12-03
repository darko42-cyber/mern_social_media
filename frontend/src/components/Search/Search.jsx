
import {Avatar} from '@material-ui/core'
import "./search.css";

const SearchBar = ({ searchUser, setSearchUser }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
                {searchUser?.profilePicture ? (
                  <img src={PF + searchUser?.profilePicture} alt="" />
                ) : (
                  <Avatar />
                )}
              </li>
              <li>{searchUser?.username}</li>
            </ul>
            <div className="searchAction">
              <button>follow</button>
            </div>
          </div>
          <hr className="hr" />
        </div>

      ))
            
    </>
  );
};

export default SearchBar;
