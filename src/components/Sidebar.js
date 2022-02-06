import React, { Children } from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 665px;

  .tags-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    grid-auto-rows: 80px;
    overflow-y: scroll;
    width: 260px;
    height: 500px;
    margin-top: 20px;
    padding: 20px;
  }
`;

function Sidebar({ children }) {
  return (
    <SidebarContainer>
      <div className="tags-wrapper">
        {children}
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;

SidebarContainer.propTypes = {
  children: PropTypes.element,
};
