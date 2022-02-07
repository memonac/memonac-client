import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const RoomListContainer = styled.div`
  display: flex;

  .room-list-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    column-gap: 20px;
  }
`;

function RoomList({ children }) {
  return (
    <RoomListContainer>
      <div className="room-list-wrapper">{children}</div>
    </RoomListContainer>
  );
}

export default RoomList;

RoomList.propTypes = {
  children: PropTypes.element,
};
