import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import styled from "styled-components";
import { debounce } from "lodash";

import close from "../assets/images/close.png";
import { memoRoomSocket } from "../app/socketSaga";
import {
  removeMemo,
  updateMemoSize,
  updateMemoText,
} from "../features/memoroom/memoRoomSlice";

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  min-width: 250px;
  min-height: 250px;
  max-width: 500px;
  max-height: 500px;
  background-color: ${(props) => props.color};
  box-shadow: 10px 10px 24px 0px rgba(0, 0, 0, 0.25);
  resize: both;

  .close {
    float: right;
    width: 10px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding-left: 15px;
    outline: none;
    border: none;
    box-sizing: border-box;
    background-color: ${(props) => props.color};
    font-size: 20px;
    resize: none;
  }

  .image {
    width: 300px;
    height: 300px;
    background-image: url(${(props) => props.imageUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    resize: none;
  }

  .memo-info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    p {
      margin: 5px 0;
      padding: 0 10px;
      font-size: 15px;
      font-weight: 900;
    }
  }

  .textarea-wrapper {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

function Memo({ id, info, tag }) {
  const [memoText, setMemoText] = useState("");

  const targetMemo = useSelector((state) => state.memoRoom.memos)[id];
  const dispatch = useDispatch();

  function handleMemoTextChange({ target }) {
    printTextValue(target.value);
  }

  const printTextValue = debounce((text) => {
    memoRoomSocket.updateMemoText(id, text);
    dispatch(updateMemoText({ memoId: id, text }));
  }, 200);

  useEffect(() => {
    if (targetMemo.formType === "text") {
      setMemoText(targetMemo.content);
    }
  }, [targetMemo.content]);

  function handleRemoveMemoClick() {
    memoRoomSocket.deleteMemo(id);
    dispatch(removeMemo({ memoId: id }));
  }

  function handleMemoSizeMouseUp({ target }) {
    if (target.id === "memoContainer") {
      const resizedWidth = target.offsetWidth;
      const resizedHeight = target.offsetHeight;

      memoRoomSocket.updateMemoSize(id, resizedWidth, resizedHeight);
      dispatch(
        updateMemoSize({
          memoId: id,
          width: resizedWidth,
          height: resizedHeight,
        })
      );
    }
  }

  const date = info.alarmDate ? new Date(info.alarmDate) : "";

  return (
    <MemoContainer
      width={targetMemo.size[0]}
      height={targetMemo.size[1]}
      color={info.color}
      imageUrl={info.content}
      onMouseUp={handleMemoSizeMouseUp}
      id="memoContainer"
    >
      <div>
        <img className="close" src={close} onClick={handleRemoveMemoClick} />
      </div>
      {info.formType === "text" && (
        <div className="textarea-wrapper">
          <textarea
            placeholder="Write.."
            defaultValue={memoText}
            onChange={handleMemoTextChange}
          />
        </div>
      )}
      {info.formType === "image" && (
        <div className="textarea-wrapper image"></div>
      )}
      <div className="memo-info-wrapper">
        <p>{tag.split(",").map((singleTag) => `#${singleTag} `)}</p>
        <p>{date.toLocaleString()}</p>
      </div>
    </MemoContainer>
  );
}

Memo.propTypes = {
  id: PropTypes.string.isRequired,
  info: PropTypes.shape({
    location: PropTypes.array.isRequired,
    size: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    formType: PropTypes.string.isRequired,
    content: PropTypes.string,
    alarmDate: PropTypes.string,
  }).isRequired,
  tag: PropTypes.string.isRequired,
};

export default Memo;
