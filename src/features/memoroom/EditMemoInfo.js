import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const EditMemoFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 550px;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);

  .error-message {
    color: #dd4a48;
  }
`;

const MemoOptionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 20px;
  line-height: 25px;

  .memo-type-container {
    display: flex;
    width: 250px;
  }

  .memo-option-title {
    font-size: 25px;
  }

  .red-color {
    color: #ea907a;
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

function EditMemoInfoModal({ isOpen, setIsOpen, memoId }) {
  const targetMemo = useSelector((state) => state.memoRoom.memos)[memoId];
  const [hasInputError, setHasInputError] = useState(false);

  function handleEditButtonClick(event) {
    event.preventDefault();
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Edit Memo Info"
      onClose={setIsOpen}
      width={650}
      height={450}
    >
      <EditMemoFormContainer onSubmit={handleEditButtonClick}>
        <MemoOptionContainer>
          <div className="memo-option-title">COLORS : </div>
          <input type="radio" name="memoColor" value="#ea907a" required />
          <div className="red-color">RED</div>
          <input type="radio" name="memoColor" value="#b5eaea" />
          <div className="blue-color">BLUE</div>
          <input type="radio" name="memoColor" value="#c9e4c5" />
          <div className="green-color">GREEN</div>
          <input type="radio" name="memoColor" value="#f7dbf0" />
          <div className="purple-color">PURPLE</div>
          <input type="radio" name="memoColor" value="#ffffff" />
          <div className="white-color">WHITE</div>
          <input type="radio" name="memoColor" value="#ffdcb8" />
          <div className="orange-color">ORANGE</div>
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
      </EditMemoFormContainer>
    </ModalContainer>
  );
}

EditMemoInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  memoId: PropTypes.string.isRequired,
};

export default EditMemoInfoModal;
