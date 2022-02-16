import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PropTypes from "prop-types";

import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import RadioButton from "../../components/RadioButton";
import changeIntoDateString from "../../utils/changeIntoDateString";
import { updateMemoStyleRequest } from "../memoroom/memoRoomSlice";
import {
  MemoFormContainer,
  MemoOptionContainer,
  SubmitButtonContainer,
} from "../memoroom/MemoModal.style";

function EditMemoModal({ isOpen, setIsOpen, memoId }) {
  const [hasInputError, setHasInputError] = useState(false);

  const targetMemo = useSelector((state) => state.memoRoom.memos)[memoId];
  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  const { memoroomId } = useParams();

  function handleEditButtonClick(event) {
    event.preventDefault();

    const { memoColor, alarmDate, alarmTime, memoTags } = event.target;

    if (!alarmDate.value && alarmTime.value) {
      setHasInputError("You cannot set only time without Date");
      return;
    }

    if (
      alarmDate?.value &&
      new Date(`${alarmDate.value} ${alarmTime.value}`) <= new Date()
    ) {
      setHasInputError("Alarm Date cannot be faster then now.");
      return;
    }

    dispatch(
      updateMemoStyleRequest({
        userId,
        memoroomId,
        memoId,
        memoColor: memoColor.value,
        alarmDate: alarmDate.value
          ? new Date(`${alarmDate.value} ${alarmTime.value}`).toISOString()
          : "",
        memoTags: memoTags.value,
      })
    );

    setIsOpen(false);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Edit Memo Info"
      onClose={setIsOpen}
      width={650}
      height={450}
    >
      <MemoFormContainer onSubmit={handleEditButtonClick}>
        <MemoOptionContainer>
          <div className="memo-option-title">COLORS : </div>
          <RadioButton
            name="memoColor"
            value="#ea907a"
            color="#ea907a"
            text="RED"
            currentValue={targetMemo.color}
          />
          <RadioButton
            name="memoColor"
            value="#b5eaea"
            color="#b5eaea"
            text="BLUE"
            currentValue={targetMemo.color}
          />
          <RadioButton
            name="memoColor"
            value="#c9e4c5"
            color="#c9e4c5"
            text="GREEN"
            currentValue={targetMemo.color}
          />
          <RadioButton
            name="memoColor"
            value="#f7dbf0"
            color="#f7dbf0"
            text="PURPLE"
            currentValue={targetMemo.color}
          />
          <RadioButton
            name="memoColor"
            value="#ffffff"
            color="#ffffff"
            text="WHITE"
            currentValue={targetMemo.color}
          />
          <RadioButton
            name="memoColor"
            value="#ffdcb8"
            color="#ffdcb8"
            text="ORANGE"
            currentValue={targetMemo.color}
          />
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">ALARM-DATE (SELECT) : </div>
          <input
            type="date"
            name="alarmDate"
            defaultValue={changeIntoDateString(targetMemo.alarmDate, "date")}
          />
          <input
            type="time"
            name="alarmTime"
            defaultValue={changeIntoDateString(targetMemo.alarmDate, "time")}
          />
        </MemoOptionContainer>
        <MemoOptionContainer>
          <div className="memo-option-title">TAGS : </div>
          <TextInput
            type="text"
            name="memoTags"
            defaultValue={targetMemo.tags.join(" ")}
            placeholder="Please Enter Tags (Make a space between different tags)"
            width={400}
          />
        </MemoOptionContainer>
        <SubmitButtonContainer>
          {hasInputError && (
            <div className="error-message">{hasInputError}</div>
          )}
          <Button text="EDIT" width={200} />
        </SubmitButtonContainer>
      </MemoFormContainer>
    </ModalContainer>
  );
}

EditMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  memoId: PropTypes.string.isRequired,
};

export default EditMemoModal;
