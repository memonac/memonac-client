import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const MemoRoomContainer = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;

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
