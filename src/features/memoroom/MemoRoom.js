import React from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";

function MemoRoom() {
  const { memoroomId } = useParams();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function foo() {
    dispatch(resetNewMemoRoomId());
    navigate("/");
  }

  return (
    <>
      <div>This is MemoRoom {memoroomId}</div>
      <button onClick={foo}>back</button>
    </>
  );
}

export default MemoRoom;
