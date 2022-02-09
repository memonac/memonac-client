import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import styled from "styled-components";
import propTypes from "prop-types";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Tag from "../../components/Tag";
import Nav from "../../components/Nav";
import RoomList from "../../components/RoomList";
import MemoRoomBox from "../../components/MemoroomBox/MemoroomBox";
import { getMemoRoomListRequest } from "./mainSlice";

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 300px 2fr);
  padding: 0 20px;
  margin: 0 50px;
`;

function Main() {
  const [selectedTags, setSelectedTags] = useState([]);

  const displayedTags = useSelector((state) => state.main.displayedTags);
  const tagInfo = useSelector((state) => state.main.tagInfo);
  const memoRooms = useSelector((state) => state.main.memoRooms);
  const newMemoRoomId = useSelector((state) => state.main.newMemoRoomId);
  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (newMemoRoomId) {
      navigate(`/${newMemoRoomId}`);
    }
  }, [newMemoRoomId]);

  useEffect(() => {
    const clickedTags = [];

    Object.entries(tagInfo).forEach(([tagName, tagStatus]) => {
      if (tagStatus.isSelected) {
        clickedTags.push(tagName);
      }
    });

    setSelectedTags(clickedTags);

    return () => setSelectedTags([]);
  }, [tagInfo]);

  useEffect(() => {
    dispatch(getMemoRoomListRequest({ userId }));
  }, []);

  return (
    <>
      <Header title="MEMONA C" />
      <Nav />
      <MainWrapper>
        <Sidebar>
          {displayedTags.map((tagName) => {
            return (
              <Tag
                key={tagName}
                text={`${tagName}`}
                isSelected={tagInfo[tagName].isSelected}
              />
            );
          })}
        </Sidebar>
        <RoomList>
          {Object.entries(memoRooms).map(([roomId, room]) => {
            const filteredTagsLength = new Set([...room.tags, ...selectedTags])
              .size;

            if (room.tags.length === filteredTagsLength) {
              return (
                <MemoRoomBox
                  key={roomId}
                  id={roomId}
                  roomName={room.name}
                  tags={room.tags}
                />
              );
            }
          })}
        </RoomList>
      </MainWrapper>
    </>
  );
}

export default Main;

MainWrapper.propTypes = {
  children: propTypes.element.isRequired,
};
