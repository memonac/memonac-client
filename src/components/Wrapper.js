import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
`;

function MainWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default MainWrapper;

MainWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
