import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ModalContainer from "../../components/Modal";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const NewMemoFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 550px;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
`;

const MemoOptionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 20px;

  .memo-type-container {
    display: flex;
    width: 250px;
  }

  .memo-option-title {
    font-size: 20px;
  }

  .red-color {
    color: #EA907A;
  }

  .blue-color {
    color: #b5eaea;
  }

  .green-color {
    color: #c9e4c5;
  }

  .purple-color {
    color: #f7dbf0;
  }

  .white-color {
    color: #ffffff;
  }

  .orange-color {
    color: #ffdcb8;
  }
`;

const SubmitButtonContainer = styled.div`
  margin: 0 auto;
`;

function NewMemoModal({ isOpen, setIsOpen }) {
  const [isImageType, setIsImageType] = useState(false);

  function handleNewMemoSubmit(event) {
    event.preventDefault();

    const { memoType, imageFile, memoColor, alarmDate, alarmTime, memoTags } =
      event.target;

    console.log(
      memoType.value,
      imageFile.value,
      memoColor.value,
      alarmDate.value,
      alarmTime.value,
      memoTags.value
    );
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
      <NewMemoFormContainer
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
          <div>{isImageType && <input type="file" name="imageFile" />}</div>
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">COLORS : </div>
          <input type="radio" name="memoColor" value="red" />
          <div className="red-color">RED</div>
          <input type="radio" name="memoColor" value="blue" />
          <div className="blue-color">BLUE</div>
          <input type="radio" name="memoColor" value="green" />
          <div className="green-color">GREEN</div>
          <input type="radio" name="memoColor" value="purple" />
          <div className="purple-color">PURPLE</div>
          <input type="radio" name="memoColor" value="white" />
          <div className="white-color">WHITE</div>
          <input type="radio" name="memoColor" value="orange" />
          <div className="orange-color">ORANGE</div>
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">ALARM-DATE : </div>
          <input type="date" name="alarmDate" />
          <input type="time" name="alarmTime" />
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">TAGS : </div>
          <TextInput
            type="text"
            name="memoTags"
            placeholder="Please Enter Tags"
            width={300}
          />
        </MemoOptionContainer>
        <SubmitButtonContainer>
          <Button text="SAVE" width={200} />
        </SubmitButtonContainer>
      </NewMemoFormContainer>
    </ModalContainer>
  );
}

export default NewMemoModal;

NewMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
