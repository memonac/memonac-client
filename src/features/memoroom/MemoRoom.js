import React from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";

import Memo from "../../components/Memo";
import ImageMemo from "../../components/ImageMemo";
import Header from "../../components/Header";

const MemoRoomContainer = styled.div`
  .memo-wrapper {
    position: relative;
  }

  .profile-box {
    position: relative;
    right: 0;
    top: 0;
    border: 1px solid black;
    width: 20px;
  }

  .sidebar {
    width: 300px;
    height: 500px;
    border: 1px solid black;
    margin-top: 20px;
  }

  .content-box {
    display: flex;
  }
`;

function MemoRoom() {
  const memos = useSelector((state) => state.memoRoom.memos);
  const memoTagInfo = {};
  const memoList = Object.entries(memos);

  memoList.forEach(([memoId, memoInfo]) => {
    memoTagInfo[memoId] = memoInfo.tags.join(",");
  });

  return (
    <MemoRoomContainer >
      <Header title="hi" />
      <div className="content-box">
        <div className="memo-wrapper">
          {memoList.map(([memoId, memoInfo]) => (
            <Memo
              key={memoId}
              // location={memoInfo.location}
              // size={memoInfo.size}
              // color={memoInfo.color}
              // content={memoInfo.content}
              // formType={memoInfo.formType}
              // tags={memoTagInfo[memoId]}
              // alarmDate={memoInfo.alarmDate}
              info={memoInfo}
              tag={memoTagInfo[memoId]}
            />
          ))}
          {/* <ImageMemo /> */}
        </div>
      </div>
    </MemoRoomContainer>
  );
}

export default MemoRoom;

