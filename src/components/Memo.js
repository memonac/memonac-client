import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { debounce } from "lodash";

import {
  removeMemoRequest,
  updateMemoSizeRequest,
  updateMemoTextRequest,
} from "../features/memoroom/memoRoomSlice";

import EditMemoModal from "../features/memoroom/EditMemoModal";
import AudioRecord from "./Audio";

import close from "../assets/images/close.png";
import memoMenu from "../assets/images/memoMenu.png";

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
  max-width: 1260px;
  max-height: 460px;
  background-color: ${(props) => props.color};
  box-shadow: 10px 10px 24px 0px rgba(0, 0, 0, 0.25);
  resize: both;

  .memo-menu,
  .close {
    float: right;
    width: 15px;
    margin-top: 10px;
    margin-right: 10px;
    padding-left: 5px;
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
    font-size: 35px;
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
      font-size: 25px;
      font-weight: 900;
    }
  }

  .textarea-wrapper {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .voice {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

function Memo({ id, info, tag }) {
  const [memoText, setMemoText] = useState("");
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  const targetMemo = useSelector((state) => state.memoRoom.memos)[id];
  const userId = useSelector((state) => state.auth.id);

  const { memoroomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetMemo.formType === "text") {
      setMemoText(targetMemo.content);
    }
  }, [targetMemo.content]);

  function handleMemoTextChange({ target }) {
    printTextValue(target.value);
  }

  const printTextValue = debounce((text) => {
    dispatch(
      updateMemoTextRequest({
        userId,
        memoroomId,
        memoId: id,
        text,
      })
    );
  }, 300);

  function handleRemoveMemoClick() {
    dispatch(
      removeMemoRequest({
        userId,
        memoroomId,
        memoId: id,
      })
    );
  }

  function handleMemoSizeMouseUp({ target }) {
    if (target.id === "memoContainer") {
      dispatch(
        updateMemoSizeRequest({
          userId,
          memoroomId,
          memoId: id,
          width: target.offsetWidth,
          height: target.offsetHeight,
        })
      );
    }
  }

  function handleEditMemoMenuClick() {
    setIsEditMenuOpen(true);
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
        <img
          className="memo-menu"
          src={memoMenu}
          onClick={handleEditMemoMenuClick}
        />
        {isEditMenuOpen && (
          <EditMemoModal
            isOpen={isEditMenuOpen}
            setIsOpen={setIsEditMenuOpen}
            memoId={id}
          />
        )}
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
      {info.formType === "voice" && (
        <div className="textarea-wrapper voice">
          <AudioRecord userId={userId} memoroomId={memoroomId} memoId={id} />
        </div>
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
