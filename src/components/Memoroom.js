import React, { useState } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const MemoRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid #000000;

  img {
    width: 30px;
    margin: 5px;
  }

  .image-wrapper {
    display: flex;
    justify-content: flex-end;
    visibility: visible;
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

const MemoRoom = ({ id, roomName, tags }) => {
  return (
    <MemoRoomContainer>
      <div className="image-wrapper">
        <img src="../assets/image/wastebasket" />
        <img src="../assets/image/menu" />
      </div>
      <div className="room-name">{roomName}</div>
      <div className="tags">{tags}</div>
    </MemoRoomContainer>
  );
};

export default MemoRoom;

MemoRoom.propTypes = {
  id: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
