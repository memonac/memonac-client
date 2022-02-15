import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import ModalContainer from "../../components/Modal";
import Button from "../../components/Button";
import { leaveMemoRoomRequest } from "./memoRoomSlice";

function LeaveMemoRoomModal({ isOpen, setIsOpen }) {
  // user가 owner인 경우는 방에서 나갈 수 없음
  // 참여자의 경우에는 방에서 나감 participants에서 제거
  const [leaveError, setLeaveError] = useState(false);

  const userId = useSelector((state) => state.auth.id);
  const memoroomOwnerId = useSelector((state) => state.memoRoom.owner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { memoroomId } = useParams();

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
      height={200}
    >
      <div>ARE YOU GONNA LEAVE THIS ROOM?</div>
      {leaveError && <div>The owner of this room cannot leave.</div>}
      <Button text="LEAVE" width={100} onClick={handleLeaveButtonClick} />
    </ModalContainer>
  );
}

LeaveMemoRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default LeaveMemoRoomModal;
