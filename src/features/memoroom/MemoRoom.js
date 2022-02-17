import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import Button from "../../components/Button";
import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import { DraggableMemo } from "../../components/DraggableMemo";
import ChatSideBar from "../../components/ChatSideBar";
import { memoRoomSocket } from "../../app/socketSaga";
import backIcon from "../../assets/images/back.png";
import { resetNewMemoRoomId } from "../main/mainSlice";
import {
  getMemoListRequest,
  resetMemoList,
  updateMemoLocationRequest,
  updateMemoLocationSuccess,
} from "./memoRoomSlice";
import NewMemoModal from "./NewMemoModal";
import LeaveMemoRoomModal from "./LeaveMemoRoomModal";
import SendMailModal from "./SendMailModal";
import ROUTES from "../../constants/routes";

const MemoRoomContainer = styled.div`
  .memo-wrapper {
    position: relative;
    overflow: hidden;
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
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const userId = useSelector((state) => state.auth.id);
  const userName = useSelector((state) => state.auth.name);

  const [inputInfo, setInputInfo] = useState({});

  const memos = useSelector((state) => state.memoRoom.memos);
  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const participants = useSelector((state) => state.memoRoom.participants);
  const chats = useSelector((state) => state.memoRoom.chats);
  const chatLastIndex = useSelector((state) => state.memoRoom.chatLastIndex);
  const error = useSelector((state) => state.memoRoom.error);

  const { memoroomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.length) {
      navigate(ROUTES.error, { state: error });
    }
  }, [error]);

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

  const memoTagInfo = {};
  const memoList = Object.entries(memos);
  const back = <img onClick={handleBackIconClick} src={backIcon} />;

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  const moveMemo = useCallback(
    (id, left, top) => {
      dispatch(
        updateMemoLocationSuccess({
          userId,
          memoroomId,
          memoId: id,
          left,
          top,
        })
      );
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
    setIsNewModalOpen(true);
  }

  function handleModalCloseClick() {
    setIsNewModalOpen(false);
  }

  function handleLeaveMemoRoomButtonClick() {
    setIsLeaveModalOpen(true);
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
          {isNewModalOpen && (
            <NewMemoModal
              roomId={memoroomId}
              isOpen={isNewModalOpen}
              setIsOpen={handleModalCloseClick}
            />
          )}
        </div>
        <div className="profile-wrapper">
          {Object.entries(participants).map(([id, data]) => (
            <Profile key={id} firstName={data.name[0]} />
          ))}
          <Button
            text="Share"
            color="#3E497A"
            width={100}
            onClick={handleShareButtonClick}
          />
          <Button
            text="Leave"
            color="#362706"
            width={100}
            onClick={handleLeaveMemoRoomButtonClick}
          />
          {isLeaveModalOpen && (
            <LeaveMemoRoomModal
              isOpen={isLeaveModalOpen}
              setIsOpen={setIsLeaveModalOpen}
            />
          )}
          <SendMailModal
            isOpen={isShareModalOpen}
            setIsOpen={setIsShareModalOpen}
          />
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
    </MemoRoomContainer>
  );
}

export default MemoRoom;
