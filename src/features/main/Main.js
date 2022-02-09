import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import propTypes from "prop-types";
import MemoRoom from "../../features/memoroom/MemoRoom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Tag from "../../components/Tag";
import Nav from "../../components/Nav";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RoomList from "../../components/RoomList";
import ModalContainer from "../../components/Modal";
// import MemoRoom from "../../components/Memoroom";
import { addNewMemoRoomRequest, getMemoRoomListRequest } from "./mainSlice";

const MainWrapper = styled.div`
  display: flex;
`;

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayedTags = useSelector((state) => state.main.displayedTags);
  const tagInfo = useSelector((state) => state.main.tagInfo);
  const memoRooms = useSelector((state) => state.main.memoRooms);
  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemoRoomListRequest({ userId }));
  }, []);

  function handleAddMemoRoomButtonClick() {
    setIsModalOpen(true);
  }

  function handleTitleInputSubmit(event) {
    event.preventDefault();
    const name = event.target.value;

    dispatch(addNewMemoRoomRequest({ userId, name }));
    // 이후 메모상세로 이동
  }

  return (
      <MemoRoom />
    // <>
    //   <Header title="memona" />
    //   <Nav />
    //   <MainWrapper>
    //     <Sidebar>
    //       {displayedTags.map((tagName) => {
    //         return (
    //           <Tag
    //             key={tagName}
    //             text={`${tagName}`}
    //             isSelected={tagInfo[tagName].isSelected}
    //           />
    //         );
    //       })}
    //     </Sidebar>
    //     <RoomList>
    //       <Button text="+" width={300} onClick={handleAddMemoRoomButtonClick} />
    //       <ModalContainer
    //         isOpen={isModalOpen}
    //         title="Memo Room Name"
    //         onClose={setIsModalOpen}
    //       >
    //         <TextInput
    //           type="text"
    //           name="name"
    //           placeholder="Please Enter Name"
    //           width={300}
    //         />
    //         <Button text="SAVE" width={100} onClick={handleTitleInputSubmit} />
    //       </ModalContainer>
    //       {Object.entries(memoRooms).map(([roomId, memoRoom]) => {
    //         return (
    //           <MemoRoom
    //             key={roomId}
    //             roomName={memoRoom.name}
    //             tags={memoRoom.tags}
    //           />
    //         );
    //       })}
    //     </RoomList>
    //   </MainWrapper>
    // </>
  );
}

export default Main;

MainWrapper.propTypes = {
  children: propTypes.element.isRequired,
};
