import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ModalContainer from "../../components/Modal";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const MemoOptionContainer = styled.div``;

function newMemoModal(isOpen, setIsOpen) {
  const [isImageType, setIsImageType] = useState(false);

  function foo(event) {
    event.preventDefault();
    console.log(event.target);
  }

  function handleImageButtonClick() {
    setIsImageType(!isImageType);
  }

  return (
    <ModalContainer isOpen={isOpen} title="New Memo" onClose={setIsOpen}>
      <form onSubmit={foo}>
        <MemoOptionContainer>
          <input type="radio" name="memoType" value="text" />
          text
          <input
            type="radio"
            name="memoType"
            value="image"
            onClick={handleImageButtonClick}
          />
          image
          <input type="radio" name="memoType" value="voice" />
          voice
          {isImageType && (
            <MemoOptionContainer>
              <input type="file" />
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
          <input type="date" value="alarmDate" />
          <input type="time" value="alarmTime" />
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

export default newMemoModal;

newMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
