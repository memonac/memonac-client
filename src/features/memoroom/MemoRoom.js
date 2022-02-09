import React from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { postSendMailRequest } from "./memoRoomSlice";

function MemoRoom() {
  const { memoroomId } = useParams();
  const userId = useSelector((state) => state.auth.id);
  console.log("userID:::::::", userId)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBackButtonClick() {
    dispatch(resetNewMemoRoomId());
    navigate("/");
  }

  function handleInviteEmailSubmit(event) {
    event.preventDefault();
    const { email } = event.target;

    dispatch(postSendMailRequest({ userId, memoroomId, email: email.value }));
  }

  return (
    <>
      <div>This is MemoRoom {memoroomId}</div>
      <button onClick={handleBackButtonClick}>back</button>

      <form onSubmit={handleInviteEmailSubmit}>
        <TextInput type="text" name="email" placeholder="email" width={300} />
        <Button width={100} text="send" />
      </form>
    </>
  );
}

export default MemoRoom;
