import React, { useContext, useRef, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import { Avatar } from "@material-ui/core";
import axios from 'axios'

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);

  const handleSumit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
    if(file){
      const data = new FormData()
      const fileName =  Date.now()+file.name.toString()
      data.append('name',fileName)
      data.append('file', file)
      newPost.image = fileName
      try {
        await axios.post('/upload',data)
        
      } catch (error) {
        console.log(error.message)
        
      }
    }
    try {
      await axios.post('posts',newPost)
      window.location.reload()
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {user.profilePicture ? (
            <img
              src={PF + user.profilePicture}
              className="shareProfileImg"
              alt=""
            />
          ) : (
            <Avatar />
          )}
          <input
            placeholder={`What's in your mind ${user.username}`}
            type="text"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {
          file && <div className = 'shareImgContainer'>
            <img className = 'shareImg' src= {URL.createObjectURL(file)} alt="" />
            <Cancel className ='shareCancel' onClick = {()=> setFile(null)} />
             </div>
        }
        <form className="shareBottom" onSubmit={handleSumit}>
          <div className="shareOptions">
            <label htmlColor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg,.jfif"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tags</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="gold" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
};

export default Share;
