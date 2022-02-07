import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import hashtag from "../assets/images/hashtag.png";
import menu from "../assets/images/menu.png";
// import wastebasket from "../assets/images/wastebasket.png";

const MemoRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid #000000;

  img {
    width: 20px;
    margin: 7px;
  }

  .image-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 300px;
  }

  .room-name {
    margin-top: 100px;
    border: none;
    font-size: 25px;
  }

  .tags {
    width: 300px;
    border-top: 1px solid black;
    font-size: 15px;
  }
`;

// { id, roomName, tags } 
const MemoRoom = ({ roomName, tags }) => {
  return (
    <MemoRoomContainer>
      <div className="image-wrapper">
        <img src={hashtag} />
        <img src={menu} />
      </div>
      <div className="room-name">{roomName}</div>
      <div className="tags">{tags}</div>
    </MemoRoomContainer>
  );
};

export default MemoRoom;

MemoRoom.propTypes = {
  // id: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
