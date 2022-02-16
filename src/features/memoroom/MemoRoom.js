import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import Button from "../../components/Button";
import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import Loading from "../../components/Loading";
import { DraggableMemo } from "../../components/DraggableMemo";
import ModalContainer from "../../components/Modal";
import TextInput from "../../components/TextInput";
import ChatSideBar from "../../components/ChatSideBar";
import backIcon from "../../assets/images/back.png";
import { memoRoomSocket } from "../../app/socketSaga";
import { resetNewMemoRoomId } from "../main/mainSlice";
import {
  getMemoListRequest,
  resetMemoList,
  postSendMailRequest,
  updateMemoLocationRequest,
} from "./memoRoomSlice";
import NewMemoModal from "./NewMemoModal";

const MemoRoomContainer = styled.div`
  .memo-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
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
  const [inputInfo, setInputInfo] = useState({});

  const userId = useSelector((state) => state.auth.id);
  const userName = useSelector((state) => state.auth.name);
  const loadingStatus = useSelector((state) => state.memoRoom.isLoading);
  const error = useSelector((state) => state.memoRoom.error);
  const success = useSelector((state) => state.memoRoom.success);
  const memos = useSelector((state) => state.memoRoom.memos);
  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const participants = useSelector((state) => state.memoRoom.participants);
  const chats = useSelector((state) => state.memoRoom.chats);
  const chatLastIndex = useSelector((state) => state.memoRoom.chatLastIndex);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoroomId } = useParams();

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
  const back = <img onClick={handleBackIconClick} src={backIcon} />;

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  const moveMemo = useCallback(
    (id, left, top) => {
      dispatch(
        updateMemoLocationRequest({
          userId,
          memoroomId,
          memoId: id,
          left,
          top,
        })
      );
    },
    [memos]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "memo",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);

        moveMemo(item.id, left, top);

        return undefined;
      },
    }),
    [moveMemo]
  );

  function handleShareButtonClick() {
    setIsShareModalOpen(!isShareModalOpen);
  }

  function handleInvitationMailSubmit(event) {
    event.preventDefault();

    const { email } = event.target;
    const isNotParticipant = Object.entries(participants).every(
      ([id, data]) => {
        email.value !== data.email;
      }
    );

    if (isNotParticipant) {
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

    setInputInfo({ message: inputMessage, date });
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
              ☝🏻 Only registered users can be invited.
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
        currentMemoRoomId={memoroomId}
        chatLastIndex={chatLastIndex}
      />
      {loadingStatus && <Loading />}
      {!loadingStatus && (
        <div className="memo-wrapper" ref={drop}>
          {memoList.map(([memoId, memoInfo]) => (
            <DraggableMemo
              key={memoId}
              id={memoId}
              left={memoInfo.location[0]}
              top={memoInfo.location[1]}
            >
              <Memo id={memoId} info={memoInfo} tag={memoTagInfo[memoId]} />
            </DraggableMemo>
          ))}
        </div>
      )}
    </MemoRoomContainer>
  );
}

export default MemoRoom;
