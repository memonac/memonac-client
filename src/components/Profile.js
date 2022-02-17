import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ProfileContainer = styled.div`
  .user-first-name {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    margin: 0 5px;
    border-radius: ${(props) => props.size}px;
    background: #c8f2ef;
    text-align: center;
    font-weight: 500;
    font-size: ${(props) => props.size - 10}px;
  }
`;

function Profile({ firstName, size = 40 }) {
  return (
    <ProfileContainer size={size}>
      <p className="user-first-name">{firstName}</p>
    </ProfileContainer>
  );
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Profile;
