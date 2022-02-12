import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";

import { resetNewMemoRoomId } from "../main/mainSlice";
import {
  getMemoListRequest,
  resetMemoList,
  postSendMailRequest,
  receiveMessage,
} from "./memoRoomSlice";
import { memoRoomSocket } from "../../app/socketSaga";

import Button from "../../components/Button";
import NewMemoModal from "./NewMemoModal";

import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import backIcon from "../../assets/images/back.png";
import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";

import ChatSideBar from "../../components/ChatSideBar";

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

  .content-box {
    height: 100%;
  }
`;

function MemoRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const error = useSelector((state) => state.memoRoom.error);
  const success = useSelector((state) => state.memoRoom.success);
  const memos = useSelector((state) => state.memoRoom.memos);
  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const userId = useSelector((state) => state.auth.id);
  const participants = useSelector((state) => state.memoRoom.participants);
  const userName = useSelector((state) => state.auth.name);
  const chats = useSelector((state) => state.memoRoom.chats);
  const [inputInfo, setinputInfo] = useState({});

  const { memoroomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemoListRequest({ userId, memoroomId }));
    memoRoomSocket.join(userId, userName, memoroomId);
  }, []);

  useEffect(() => {
    if (!inputInfo.message) {
      return;
    }

    memoRoomSocket.sendMessage(inputInfo.message, inputInfo.date);
  }, [inputInfo.message, inputInfo.date]);

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
  const back = <img onClick={handleBackIconClick} src={backIcon}></img>;

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  function handleShareButtonClick() {
    setIsShareModalOpen(!isShareModalOpen);
  }

  function handleInvitationMailSubmit(event) {
    event.preventDefault();

    const { email } = event.target;
    const participant = Object.entries(participants).find(([id, data]) => {
      email.value === data.email;
    });

    if (!participant) {
      dispatch(postSendMailRequest({ userId, memoroomId, email: email.value }));

      return;
    }

    setErrorMessage("❗️ Already participated member");
  }

  function handleBackIconClick() {
    memoRoomSocket.leave(memoroomId);
    dispatch(resetNewMemoRoomId());
    dispatch(resetMemoList());
    navigate("/");
  }

  function handleChatButtonClick() {
    setIsChatOpen(!isChatOpen);
  }

  function handleSendMessageSubmit(event) {
    event.preventDefault();

    const inputMessage = event.target.message.value;
    const date = new Date();
    dispatch(
      receiveMessage({
        user: {
          id: userId,
          name: userName,
        },
        message: inputMessage,
        date: date,
      })
    );
    setinputInfo({ message: inputMessage, date });
    event.target.message.value = "";
  }

  function handleNewMemoModalClick() {
    setIsModalOpen(true);
  }

  function handleModalCloseClick() {
    setIsModalOpen(false);
  }

  return (
    <MemoRoomContainer>
      <Header title={memoRoomName} left={back} />
      <div className="nav">
        <div>
          <Button
            onClick={handleChatButtonClick}
            text={`Chat ${isChatOpen ? "Close" : "Open"}`}
            width={100}
          />
          <Button text="New" width={100} onClick={handleNewMemoModalClick} />
          {isModalOpen && (
            <NewMemoModal
              roomId={memoroomId}
              isOpen={isModalOpen}
              setIsOpen={handleModalCloseClick}
            />
          )}
        </div>
        <div className="profile-wrapper">
          {Object.entries(participants).map(([id, data]) => (
            <Profile key={id} firstName={data.name[0]} />
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
            <form onSubmit={handleInvitationMailSubmit}>
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
      <ChatSideBar
        onSubmitInputText={handleSendMessageSubmit}
        chatList={chats}
        isOpen={isChatOpen}
        currentUserId={userId}
      />
      <div className="memo-wrapper">
        {memoList.map(([memoId, memoInfo]) => {
          return (
            <Memo
              key={memoId}
              id={memoId}
              info={memoInfo}
              tag={memoTagInfo[memoId]}
            />
          );
        })}
      </div>
    </MemoRoomContainer>
  );
}

export default MemoRoom;
