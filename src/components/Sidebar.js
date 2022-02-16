import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  /* min-height: 665px; */
  padding-left: 35px;
  background-color: #ffe699;

  .tags-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    grid-auto-rows: 80px;
    overflow-y: scroll;
    width: 260px;
    height: 500px;
  }
`;

function Sidebar({ children }) {
  return (
    <SidebarContainer>
      <div className="tags-wrapper">{children}</div>
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  children: PropTypes.array,
};

export default Sidebar;
