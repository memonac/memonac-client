import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { postVerifyTokenRequest } from "../features/memoroom/memoRoomSlice";

import Button from "./Button";

import ROUTES from "../constants/routes";

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(50%);
  align-items: center;

  .error-title {
    font-size: 50px;
    font-weight: 700;
  }
`;

function VerifyInvitedUser() {
  const user = useSelector((state) => state.memoRoom.participants);
  const error = useSelector((state) => state.memoRoom.error);

  const { memoroomId } = useParams();
  const { search } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  const token = searchParams.get("token");

  useEffect(() => {
    dispatch(postVerifyTokenRequest({ memoroomId, token }));
  }, []);

  function handleLoginButtonClick() {
    navigate(ROUTES.login);
  }

  if (user) {
    navigate(ROUTES.login);
  }

  return (
    <NotificationContainer>
      {error.length && (
        <>
          <div className="error-title">{error}</div>
          <Button text="LOGIN" onClick={handleLoginButtonClick} width={200} />
        </>
      )}
    </NotificationContainer>
  );
}

export default VerifyInvitedUser;
