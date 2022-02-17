import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { leaveMemoRoomRequest } from "./memoRoomSlice";

import ModalContainer from "../../components/Modal";
import Button from "../../components/Button";

const ErrorText = styled.div`
  padding: 10px 0;
  color: #dd4a48;
`;

function LeaveMemoRoomModal({ isOpen, setIsOpen }) {
  const [leaveError, setLeaveError] = useState(false);

  const userId = useSelector((state) => state.auth.id);
  const memoroomOwnerId = useSelector((state) => state.memoRoom.owner);

  const { memoroomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLeaveButtonClick() {
    if (userId === memoroomOwnerId) {
      setLeaveError(true);
      return;
    }

    dispatch(leaveMemoRoomRequest({ userId, memoroomId }));
    setIsOpen(false);
    navigate("/");
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Leave Room"
      onClose={setIsOpen}
      height={230}
    >
      <div>ARE YOU GONNA LEAVE THIS ROOM?</div>
      {leaveError && (
        <ErrorText>The owner of this room cannot leave.</ErrorText>
      )}
      <Button text="LEAVE" width={100} onClick={handleLeaveButtonClick} />
    </ModalContainer>
  );
}

LeaveMemoRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default LeaveMemoRoomModal;
