import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";
import {
  getMemoListRequest,
  resetMemoList,
  receiveMessage,
} from "./memoRoomSlice";
import { memoRoomSocket } from "../../app/socketSaga";

import styled from "styled-components";

import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import Button from "../../components/Button";
import backIcon from "../../assets/images/back.png";

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
  const memos = useSelector((state) => state.memoRoom.memos);
  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const userId = useSelector((state) => state.auth.id);
  const participants = useSelector((state) => state.memoRoom.participants);
  const userName = useSelector((state) => state.auth.name);
  const chats = useSelector((state) => state.memoRoom.chats);

  const [isChatOpen, setIsChatOpen] = useState(false);
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

  const memoTagInfo = {};
  const memoList = Object.entries(memos);

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

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

  const back = <img onClick={handleBackIconClick} src={backIcon}></img>;

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
        </div>
        <div className="profile-wrapper">
          {participants.map(({ id, name }) => (
            <Profile key={id} firstName={name[0]} />
          ))}
          <Button text="share" color="#3E497A" width={100} />
        </div>
      </div>
      <ChatSideBar
        onSubmitInputText={handleSendMessageSubmit}
        chatList={chats}
        isOpen={isChatOpen}
        currentUserId={userId}
      />
      <div className="memo-wrapper">
        {memoList.map(([memoId, memoInfo]) => (
          <Memo key={memoId} info={memoInfo} tag={memoTagInfo[memoId]} />
        ))}
      </div>
    </MemoRoomContainer>
  );
}

export default MemoRoom;
