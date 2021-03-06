import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { addNewMemoRequest } from "./memoRoomSlice";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import ModalContainer from "../../components/Modal";
import RadioButton from "../../components/RadioButton";
import {
  MemoFormContainer,
  MemoOptionContainer,
  SubmitButtonContainer,
} from "../memoroom/MemoModal.style";

import { ERROR_MESSAGE } from "../../constants/response";

function NewMemoModal({ isOpen, setIsOpen, roomId }) {
  const [isImageType, setIsImageType] = useState(false);
  const [hasInputError, setHasInputError] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(undefined);

  const currentUserId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  function handleNewMemoSubmit(event) {
    event.preventDefault();

    const { memoType, memoColor, alarmDate, alarmTime, memoTags } =
      event.target;

    const formData = new FormData();

    if (alarmDate.value) {
      const date = new Date(
        `${alarmDate.value} ${alarmTime?.value}`
      ).toISOString();
      formData.append("alarmDate", date);
    } else {
      if (alarmTime.value) {
        setHasInputError(ERROR_MESSAGE.cannotSetTimeWithoutDate);
        return;
      }

      formData.append("alarmDate", "");
    }

    if (memoType.value === "image" && !uploadedImage) {
      setHasInputError(ERROR_MESSAGE.shoudUploadImageFile);
      return;
    }

    if (
      alarmDate?.value &&
      new Date(`${alarmDate.value} ${alarmTime.value}`) <= new Date()
    ) {
      setHasInputError(ERROR_MESSAGE.cannotSetDateFasterThenNow);
      return;
    }

    formData.append("memoRoomId", roomId);
    formData.append("author", currentUserId);
    formData.append("memoType", memoType.value);
    formData.append("imageFile", uploadedImage);
    formData.append("memoColor", memoColor.value);
    formData.append("memoTags", memoTags.value);

    dispatch(addNewMemoRequest(formData));

    setIsOpen(false);
  }

  function handleUploadFileChange(event) {
    setUploadedImage(event.target.files[0]);
  }

  function handleImageButtonClick() {
    setIsImageType(true);
  }

  function handleNotImageButtonClick() {
    setIsImageType(false);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      title="New Memo"
      onClose={setIsOpen}
      width={650}
      height={500}
    >
      <MemoFormContainer
        onSubmit={handleNewMemoSubmit}
        className="new-memo-container"
      >
        <MemoOptionContainer>
          <div className="memo-type-container">
            <div className="memo-option-title">TYPES : </div>
            <input
              type="radio"
              name="memoType"
              value="text"
              onClick={handleNotImageButtonClick}
              required
            />
            text
            <input
              type="radio"
              name="memoType"
              value="image"
              onClick={handleImageButtonClick}
            />
            image
            <input
              type="radio"
              name="memoType"
              value="voice"
              onClick={handleNotImageButtonClick}
            />
            voice
          </div>
          <div>
            {isImageType && (
              <input
                type="file"
                name="imageFile"
                onChange={handleUploadFileChange}
                required
              />
            )}
          </div>
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">COLORS : </div>
          <RadioButton
            name="memoColor"
            value="#ea907a"
            color="#ea907a"
            text="RED"
          />
          <RadioButton
            name="memoColor"
            value="#b5eaea"
            color="#b5eaea"
            text="BLUE"
          />
          <RadioButton
            name="memoColor"
            value="#c9e4c5"
            color="#c9e4c5"
            text="GREEN"
          />
          <RadioButton
            name="memoColor"
            value="#f7dbf0"
            color="#f7dbf0"
            text="PURPLE"
          />
          <RadioButton
            name="memoColor"
            value="#ffffff"
            color="#ffffff"
            text="WHITE"
          />
          <RadioButton
            name="memoColor"
            value="#ffdcb8"
            color="#ffdcb8"
            text="ORANGE"
          />
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">ALARM-DATE (SELECT) : </div>
          <input type="date" name="alarmDate" />
          <input type="time" name="alarmTime" />
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">TAGS : </div>
          <TextInput
            type="text"
            name="memoTags"
            placeholder="Please Enter Tags (Make a space between different tags)"
            width={400}
          />
        </MemoOptionContainer>
        <SubmitButtonContainer>
          {hasInputError && (
            <div className="error-message">{hasInputError}</div>
          )}
          <Button text="SAVE" width={200} />
        </SubmitButtonContainer>
      </MemoFormContainer>
    </ModalContainer>
  );
}

NewMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
};

export default NewMemoModal;
