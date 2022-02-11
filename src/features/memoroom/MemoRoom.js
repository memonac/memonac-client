import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";
import { getMemoListRequest, resetMemoList } from "./memoRoomSlice";

import styled from "styled-components";

import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import Button from "../../components/Button";
import backIcon from "../../assets/images/back.png";

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
  const memos = useSelector((state) => state.memoRoom.memos);
  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const userId = useSelector((state) => state.auth.id);
  const participants = useSelector((state) => state.memoRoom.participants);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const { memoroomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemoListRequest({ userId, memoroomId }));
  }, []);

  const memoTagInfo = {};
  const memoList = Object.entries(memos);

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

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
          <Button text="share" color="#3E497A" width={100} />
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
