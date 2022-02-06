import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Tag from "../../components/Tag";
import Nav from "../../components/Nav";

import { getMemoRoomListRequest } from "./mainSlice";

function Main() {
  const displayedTags = useSelector((state) => state.main.displayedTags);
  const tagInfo = useSelector((state) => state.main.tagInfo);
  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemoRoomListRequest({ userId }));
  }, []);

  return (
    <>
      <Header title="memona" />
      <Nav />
      <Sidebar >
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
    </>
  );
}

export default Main;
