import React, { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import hashtag from "../assets/images/hashtag.png";
import menu from "../assets/images/menu.png";
import clickedMenu from "../assets/images/click-menu.png";
import pen from "../assets/images/pen.png";
import wastebasket from "../assets/images/wastebasket.png";

const MemoRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;
  height: 300px;
  margin:0 10px 20px 0;
  border: 1px solid #000000;
  background: #ffc300;

  img {
    width: 40px;
    margin: 15px;
  }
  .menu-icon {
    width: 20px;
    margin: 7px;
  }

  .menu-bar {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 300px;
  }

  .memoroom-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 220px;
    margin-top: 80px;
  }

  .room-name {
    border: none;
    font-size: 25px;
  }

  .participant {
    display: flex;
    justify-content: center;
    width: 300px;
    height: 50px;
    border-top: 1px solid #000000;
    background: #fefbf2;
    font-size: 15px;
  }

  .tags {
    display: flex;
    justify-content: center;
    width: 200px;
    height: 100px;
    font-size: 15px;
  }

  .tag {
    margin: 3px;
    color: #ffffff;
  }

  .menu-click {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, 0.6);
  }

  .menu-click-content {
    margin-top: 100px;
  }
`;

const MemoRoom = ({ roomName, tags }) => {
  const [clickMemoRoomMenu, setClickMemoRoomMenu] = useState(false);
  const [clickMemoRoomHashTag, setClickMemoRoomHashTag] = useState(false);

  function handleMenuClick() {
    setClickMemoRoomMenu(!clickMemoRoomMenu);
  }

  function handleHashtagClick() {
    setClickMemoRoomHashTag(!clickMemoRoomHashTag);
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
      {clickMemoRoomMenu && (
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
      {clickMemoRoomHashTag && (
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
                  <div key={tag} className="tag">{tag}</div>
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
  roomName: PropTypes.string.isRequired,
  tags: PropTypes.array,
};
