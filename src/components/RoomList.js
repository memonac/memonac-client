import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

RoomList.propTypes = {
  children: PropTypes.node,
};

export default RoomList;
