import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ModalContainer from "../../components/Modal";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const MemoOptionContainer = styled.div``;

function NewMemoModal(isOpen, setIsOpen) {
  const [isImageType, setIsImageType] = useState(false);

  function handleNewMemoSubmit(event) {
    event.preventDefault();

    const { memoType, imageFile, memoColor, alarmDate, alarmTime, memoTags } = event.target;

    console.log(memoType.value, imageFile.value, memoColor.value, alarmDate.value, alarmTime.value, memoTags.value);
  }

  function handleImageButtonClick() {
    setIsImageType(!isImageType);
  }

  function handleNotImageButtonClick() {
    setIsImageType(false);
  }

  return (
    <ModalContainer isOpen={isOpen} title="New Memo" onClose={setIsOpen}>
      <form onSubmit={handleNewMemoSubmit}>
        <MemoOptionContainer>
          <input
            type="radio"
            name="memoType"
            value="text"
            onClick={handleNotImageButtonClick}
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
          {isImageType && (
            <MemoOptionContainer>
              <input type="file" name="imageFile"/>
            </MemoOptionContainer>
          )}
        </MemoOptionContainer>
        <MemoOptionContainer>
          <input
            type="radio"
            name="memoColor"
            value="red"
            className="red-color"
          />
          RED
          <input
            type="radio"
            name="memoColor"
            value="blue"
            className="blue-color"
          />
          BLUE
          <input
            type="radio"
            name="memoColor"
            value="green"
            className="green-color"
          />
          GREEN
          <input
            type="radio"
            name="memoColor"
            value="purple"
            className="purple-color"
          />
          PURPLE
          <input
            type="radio"
            name="memoColor"
            value="white"
            className="white-color"
          />
          WHITE
          <input
            type="radio"
            name="memoColor"
            value="gray"
            className="gray-color"
          />
          GRAY
        </MemoOptionContainer>
        <MemoOptionContainer>
          <input type="date" name="alarmDate" />
          <input type="time" name="alarmTime" />
        </MemoOptionContainer>
        <MemoOptionContainer>
          <TextInput
            type="text"
            name="memoTags"
            placeholder="Please Enter Tags"
            width={400}
          />
        </MemoOptionContainer>
        <Button text="SAVE" />
      </form>
    </ModalContainer>
  );
}

export default NewMemoModal;

NewMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // setIsOpen: PropTypes.func.isRequired,
};
