import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { editMemoRoomTitleRequest } from "../../features/main/mainSlice";
import ModalContainer from "../Modal";
import TextInput from "../TextInput";
import Button from "../Button";

function EditRoomTitleModal({
  id,
  isOpen,
  setIsOpen,
  setIsMenuOpen,
  roomName,
}) {
  const currentUserId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  function handleTitleInputEditSubmit(event) {
    event.preventDefault();
    const { name } = event.target;

    dispatch(
      editMemoRoomTitleRequest({
        userId: currentUserId,
        memoRoomId: id,
        name: name.value,
      })
    );

    setIsOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <ModalContainer isOpen={isOpen} title="Edit Room Name" onClose={setIsOpen}>
      <form onSubmit={handleTitleInputEditSubmit}>
        <TextInput
          type="text"
          name="name"
          defaultValue={roomName}
          placeholder="Please Enter Name"
          width={200}
        />
        <Button text="EDIT" width={100} />
      </form>
    </ModalContainer>
  );
}

EditRoomTitleModal.propTypes = {
  id: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default EditRoomTitleModal;
