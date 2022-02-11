import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";
import {
  getMemoListRequest,
  postSendMailRequest,
  resetMemoList,
} from "./memoRoomSlice";

import styled from "styled-components";

import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import Button from "../../components/Button";
import backIcon from "../../assets/images/back.png";
import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";

const MemoRoomContainer = styled.div`
  .memo-wrapper {
    position: relative;
    height: 100%;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .profile-wrapper {
    display: flex;
    align-items: center;
  }

  .profile-box {
    position: relative;
    right: 0;
    top: 0;
    width: 20px;
  }

  .sidebar {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 500px;
    left: ${(props) => (props.chatState ? 5 : -400)}px;
    background-color: #ffffff;
    transition: 1s;
  }

  .content-box {
    height: 100%;
  }
`;

function MemoRoom() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const memos = useSelector((state) => state.memoRoom.memos);
  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const userId = useSelector((state) => state.auth.id);
  const participants = useSelector((state) => state.memoRoom.participants);
  const error = useSelector((state) => state.memoRoom.error);
  const success = useSelector((state) => state.memoRoom.success);

  const { memoroomId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemoListRequest({ userId, memoroomId }));
  }, []);

  useEffect(() => {
    if (error) {
      setErrorMessage("❗️ Failed to send mail");
    }

    return () => setErrorMessage("");
  }, [error]);

  useEffect(() => {
    if (success) {
      setSuccessMessage(" Success to send mail 👍🏻 ");
    }

    return () => setSuccessMessage("");
  }, [success]);

  const memoTagInfo = {};
  const memoList = Object.entries(memos);

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  function handleShareButtonClick() {
    setIsShareModalOpen(!isShareModalOpen);
  }

  function handleInviteMailSubmit(event) {
    event.preventDefault();

    const { email } = event.target;
    const participant = participants.find((user) => user.email === email.value);

    if (!participant) {
      dispatch(postSendMailRequest({ userId, memoroomId, email: email.value }));
    }

    if (participant) {
      setErrorMessage("❗️ Already participated member");
    }
  }

  function handleBackIconClick() {
    dispatch(resetNewMemoRoomId());
    dispatch(resetMemoList());
    navigate("/");
  }

  function handleChatButtonClick() {
    setIsChatOpen(!isChatOpen);
  }

  const back = <img onClick={handleBackIconClick} src={backIcon}></img>;

  return (
    <MemoRoomContainer chatState={isChatOpen}>
      <Header title={memoRoomName} left={back} />
      <div className="nav">
        <div>
          <Button
            onClick={handleChatButtonClick}
            text={`Chat ${isChatOpen ? "Close" : "Open"}`}
            width={100}
          />
        </div>
        <div className="profile-wrapper">
          {participants.map(({ id, name }) => (
            <Profile key={id} firstName={name[0]} />
          ))}
          <Button
            text="share"
            color="#3E497A"
            width={100}
            onClick={handleShareButtonClick}
          />
          <ModalContainer
            isOpen={isShareModalOpen}
            title="Invite Your Friends!"
            onClose={setIsShareModalOpen}
          >
            <div className="notification">
              ☝🏻 가입된 사용자만 초대할 수 있습니다
            </div>
            <form onSubmit={handleInviteMailSubmit}>
              <TextInput
                type="email"
                name="email"
                placeholder="Please Enter Email"
                width={200}
              />
              <Button text="SEND" width={100} />
            </form>
            <div>{errorMessage}</div>
            <div>{successMessage}</div>
          </ModalContainer>
        </div>
      </div>
      <div className="sidebar"></div>
      <div className="memo-wrapper">
        {memoList.map(([memoId, memoInfo]) => (
          <Memo key={memoId} info={memoInfo} tag={memoTagInfo[memoId]} />
        ))}
      </div>
    </MemoRoomContainer>
  );
}

export default MemoRoom;
