import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useDrop } from "react-dnd";
import styled from "styled-components";

import { resetNewMemoRoomId } from "../main/mainSlice";
import Button from "../../components/Button";
import NewMemoModal from "./NewMemoModal";
import { getMemoListRequest, resetMemoList } from "./memoRoomSlice";
import { updateMemoLocationRequest } from "../memoroom/memoRoomSlice";

import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";
import { DraggableMemo } from "../../components/DraggableMemo";
import backIcon from "../../assets/images/back.png";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { memoroomId } = useParams();

  const memos = useSelector((state) => state.memoRoom.memos);

  const memoRoomName = useSelector((state) => state.memoRoom.name);
  const userId = useSelector((state) => state.auth.id);
  const participants = useSelector((state) => state.memoRoom.participants);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemoListRequest({ userId, memoroomId }));
  }, []);

  const memoTagInfo = {};
  const memoList = Object.entries(memos);
  const back = <img onClick={handleBackIconClick} src={backIcon}></img>;

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  const moveMemo = useCallback(
    (id, left, top) => {
      dispatch(
        updateMemoLocationRequest({ userId, memoroomId, memoId: id, left, top })
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

  function handleBackIconClick() {
    dispatch(resetNewMemoRoomId());
    dispatch(resetMemoList());
    navigate("/");
  }

  function handleChatButtonClick() {
    setIsChatOpen(!isChatOpen);
  }

  function handleNewMemoModalClick() {
    setIsModalOpen(true);
  }

  function handleModalCloseClick() {
    setIsModalOpen(false);
  }

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
          <Button text="share" color="#3E497A" width={100} />
        </div>
      </div>
      <div className="sidebar"></div>
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
