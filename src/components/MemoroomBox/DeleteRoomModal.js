import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { removeMemoRoomRequest } from "../../features/main/mainSlice";

import ModalContainer from "../Modal";
import Button from "../Button";

const ErrorMessage = styled.div`
  padding: 10px 0;
  color: #f03c3c;
`;

function DeleteRoomModal({ id, isOpen, setIsOpen }) {
  const [hasRemoveRoomError, setHasRemoveRoomError] = useState(false);

  const currentUserId = useSelector((state) => state.auth.id);
  const memoroomOwnerId = useSelector((state) => state.main.memoRooms)[id]
    .owner;

  const dispatch = useDispatch();

  function handleDeleteButtonClick() {
    if (currentUserId !== memoroomOwnerId) {
      setHasRemoveRoomError(true);
      return;
    }

    dispatch(
      removeMemoRoomRequest({
        userId: currentUserId,
        memoRoomId: id,
      })
    );

    setIsOpen(false);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Delete Room"
      onClose={setIsOpen}
      height={250}
    >
      <div>ARE YOU GONNA DELETE THIS ROOM?</div>
      {hasRemoveRoomError && (
        <ErrorMessage>Only Owner can remove this room.</ErrorMessage>
      )}
      <Button text="DELETE" width={200} onClick={handleDeleteButtonClick} />
    </ModalContainer>
  );
}

DeleteRoomModal.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default DeleteRoomModal;
