import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  background-color: #ffa70f;
  font-size: 25px;
  color: #ffffff;

  .title-box {
    flex: 2 1 0;
    display: flex;
    justify-content: center;
    line-height: 35px;
  }

  .left-box {
    flex: 1 1 0;
  }

  .right-box {
    display: flex;
    flex: 1 2 0;
  }
`;

function Header({ title, left, right }) {
  return (
    <HeaderContainer>
      <div className="left-box">{left}</div>
      <div className="title-box">
        <h1>{title}</h1>
      </div>
      <div className="right-box">{right}</div>
    </HeaderContainer>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element,
};
