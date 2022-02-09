import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const ProfileContainer = styled.div`
  p {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 50px;
    background: #999;
    text-align: center;
    font-weight: 500;
    font-size: 30px;
  }
`;

function Profile({ firstName }) {
  return (
    <ProfileContainer>
      <p>{firstName}</p>
    </ProfileContainer>
  );
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
};

export default Profile;
