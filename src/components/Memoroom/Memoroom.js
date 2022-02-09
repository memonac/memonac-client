import React, { useState } from "react";

import PropTypes from "prop-types";
import hashtag from "../assets/images/hashtag.png";
import menu from "../assets/images/menu.png";
import clickedMenu from "../assets/images/click-menu.png";
import pen from "../assets/images/pen.png";
import wastebasket from "../assets/images/wastebasket.png";
import { MemoRoomContainer } from "./Memoroom.style";

const MemoRoom = ({ id, roomName, tags }) => {
  const [clickMenu, setClickMenu] = useState(false);
  const [clickHashtag, setClickHashtag] = useState(false);

  function handleMenuClick() {
    setClickMenu(!clickMenu);
  }

  function handleHashtagClick() {
    setClickHashtag(!clickHashtag);
  }

  return (
    <MemoRoomContainer>
      <div>
        <div className="menu-bar">
          <img
            src={hashtag}
            className="menu-icon"
            onClick={handleHashtagClick}
          />
          <img src={menu} className="menu-icon" onClick={handleMenuClick} />
        </div>
        <div className="memoroom-content">
          <div className="room-name">{roomName}</div>
          <div className="participant"></div>
        </div>
      </div>
      {clickMenu && (
        <div className="menu-click">
          <div className="menu-bar">
            <img src={hashtag} className="menu-icon" />
            <img
              src={clickedMenu}
              className="menu-icon"
              onClick={handleMenuClick}
            />
          </div>
          <div className="menu-click-content">
            <img src={wastebasket} />
            <img src={pen} />
          </div>
        </div>
      )}
      {clickHashtag && (
        <div className="menu-click">
          <div className="menu-bar">
            <img
              src={hashtag}
              className="menu-icon"
              onClick={handleHashtagClick}
            />
            <img src={menu} className="menu-icon" />
          </div>
          <div className="menu-click-content">
            <div className="tags">
              {tags.map((tag) => {
                return (
                  <div key={tag} className="tag">
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </MemoRoomContainer>
  );
};

export default MemoRoom;

MemoRoom.propTypes = {
  id: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
