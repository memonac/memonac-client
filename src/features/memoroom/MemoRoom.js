import React from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";

function MemoRoom() {
  const { memoroomId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBackButtonClick() {
    dispatch(resetNewMemoRoomId());
    navigate("/");
  }

  return (
    <>
      <div>This is MemoRoom {memoroomId}</div>
      <button onClick={handleBackButtonClick}>back</button>
    </>
  );
}

export default MemoRoom;
