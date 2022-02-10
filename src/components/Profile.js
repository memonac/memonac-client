import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const ProfileContainer = styled.div`
  .user-first-name {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 50px;
    background: #c8f2ef;
    text-align: center;
    font-weight: 500;
    font-size: 30px;
  }
`;

function Profile({ firstName }) {
  return (
    <ProfileContainer>
      <p className="user-first-name">{firstName}</p>
    </ProfileContainer>
  );
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
};

export default Profile;
