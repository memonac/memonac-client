import { func } from "prop-types";
import React from "react";

import styled from "styled-components";

const ProfileContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: lightblue;
  border-radius: 50%;

  p {
    text-align: center;
    line-height: 40px;
    font-weight: 500;
    font-size: 20px;
  }
`;

function Profile({ firstName }) {
  return (
    <ProfileContainer>
      <p>{firstName}</p>
    </ProfileContainer>
  );
}

export default Profile;
