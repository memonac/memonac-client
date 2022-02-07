import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Tag from "../../components/Tag";
import Nav from "../../components/Nav";

import { addNewMemoRoomRequest, getMemoRoomListRequest } from "./mainSlice";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import RoomList from "../../components/RoomList";
import ModalContainer from "../../components/Modal";
import MemoRoom from "../../components/Memoroom";
import MainWrapper from "../../components/Wrapper";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayedTags = useSelector((state) => state.main.displayedTags);
  const tagInfo = useSelector((state) => state.main.tagInfo);
  const memoRooms = useSelector((state) => state.main.memoRooms);
  const userId = useSelector((state) => state.auth.id);
console.log(userId)
  const dispatch = useDispatch();
console.log("memoroom>>>>", memoRooms)
console.log("key>>>", memoRooms.key)
  useEffect(() => {
    dispatch(getMemoRoomListRequest({ userId }));
  }, []);

  function handleAddMemoRoomButtonClick() {
    setIsModalOpen(true);
  }

  function handleTitleInputSubmit(event) {
    event.preventDefault();
    const name = event.target.value;

    dispatch(addNewMemoRoomRequest(name));
  }

  return (
    <>
      <Header title="memona" />
      <Nav />
      <MainWrapper>
        <Sidebar>
          {displayedTags.map((value, key) => {
            return (
              <Tag
                key={value}
                text={`${value}`}
                isSelected={tagInfo[value].isSelected}
              />
            );
          })}
        </Sidebar>
        <RoomList>
          <Button text="+" width="300" onClick={handleAddMemoRoomButtonClick} />
          <ModalContainer
            isOpen={isModalOpen}
            title="Memo Room Name"
            onClose={setIsModalOpen}
          >
            <TextInput
              type="text"
              name="name"
              placeholder="Please Enter Name"
              width={300}
            />
            <Button text="SAVE" width="100" onClick={handleTitleInputSubmit} />
          </ModalContainer>
          {Object.entries(memoRooms).map(([id, data]) => {
            return (
              <MemoRoom
               key={id}
               roomName={data.name}
               tags={data.tags}
              />
            );
          })}
        </RoomList>
      </MainWrapper>
    </>
  );
}

export default Main;
