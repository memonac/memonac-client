import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import AWS from "aws-sdk";

import ModalContainer from "../../components/Modal";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { addNewMemoRequest } from "./memoRoomSlice";
import changeIntoAwsUrl from "../../utils/changeIntoAwsUrl";

const NewMemoFormContainer = styled.form`
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

function NewMemoModal({ isOpen, setIsOpen, roomId }) {
  const [isImageType, setIsImageType] = useState("");
  const [hasInputError, setHasInputError] = useState(false);
  const [imageFileName, setImageFileName] = useState("");

  const currentUserId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  AWS.config.update({
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_AWS_BUCKET_IDENTITY_POOL_ID,
    }),
  });

  async function handleImageUploadClick(event) {
    const Imagefile = event.target.files[0];

    try {
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: "okongee-project",
          Key: Imagefile.name,
          Body: Imagefile,
        },
      });

      const result = await upload.promise();
      setImageFileName(changeIntoAwsUrl(result));
    } catch (err) {
      setHasInputError(err);
    }
  }

  function handleNewMemoSubmit(event) {
    event.preventDefault();

    const { memoType, imageFile, memoColor, alarmDate, alarmTime, memoTags } =
      event.target;

    if (memoType.value === "image" && !imageFile?.value) {
      setHasInputError("You should upload an image file.");
      return;
    }

    if (
      alarmDate?.value &&
      new Date(`${alarmDate.value} ${alarmTime.value}`) <= new Date()
    ) {
      setHasInputError("Alarm Date cannot be later then now.");
      return;
    }

    dispatch(
      addNewMemoRequest({
        memoRoomId: roomId,
        author: currentUserId,
        memoType: memoType.value,
        imageFile: imageFileName,
        memoColor: memoColor.value,
        alarmDate: alarmDate?.value,
        alarmTime: alarmTime?.value,
        memoTags: memoTags.value,
      })
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
                onChange={handleImageUploadClick}
                required
              />
            )}
          </div>
        </MemoOptionContainer>
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
      </NewMemoFormContainer>
    </ModalContainer>
  );
}

export default NewMemoModal;

NewMemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
};
