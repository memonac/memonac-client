import React from "react";

import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";

import styled from "styled-components";

import Memo from "../../components/Memo";
import Header from "../../components/Header";
import Profile from "../../components/Profile";

const MemoRoomContainer = styled.div`
  .memo-wrapper {
    position: relative;
  }

  .main-wrapper {
    display: flex;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
  }

  .parti {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .profile-wrapper {
    display: flex;
  }

  .profile-box {
    position: relative;
    right: 0;
    top: 0;
    border: 1px solid black;
    width: 20px;
  }

  .sidebar {
    position: absolute;
    z-index: 1;
    width: 300px;
    height: 500px;
    left: -400px;
    background-color: white;
    border: 1px solid black;
  }

  .content-box {
    display: flex;
  }
`;

function MemoRoom() {
  const memos = useSelector((state) => state.memoRoom.memos);
  const memoTagInfo = {};
  const memoList = Object.entries(memos);

  const { memoroomId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBackButtonClick() {
    dispatch(resetNewMemoRoomId());
    navigate("/");
  }

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  return (
    <MemoRoomContainer >
      <div>This is MemoRoom {memoroomId}</div>
      <button onClick={handleBackButtonClick}>back</button>
      <Header title="hi" />
      <div className="parti">
        <div>
          <button>sadf</button>
        </div>
        <div className="profile-wrapper">
          <Profile />
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </div>
      </div>
      <div className="sidebar">

      </div>
      <div className="main-wrapper">
        <div className="content-wrapper">
          <div className="content-box">
            <div className="memo-wrapper">
              {memoList.map(([memoId, memoInfo]) => (
                <Memo
                  key={memoId}
                  info={memoInfo}
                  tag={memoTagInfo[memoId]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MemoRoomContainer>
  );
}

export default MemoRoom;

