import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const RoomListContainer = styled.div`
  display: grid;
  margin: 0 60px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 3fr));
  width: 100%;
  column-gap: 20px;
`;

function RoomList({ children }) {
  return <RoomListContainer>{children}</RoomListContainer>;
}

export default RoomList;

RoomList.propTypes = {
  children: PropTypes.node,
};
