import "./chatOnline.css";

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className = 'chatOnlineImg' src="/assets/rolls-2.jpg" alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Emma</span>
      </div>
    </div>
  );
};

export default ChatOnline;
