import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { resetNewMemoRoomId } from "../main/mainSlice";
import Button from "../../components/Button";
import NewMemoModal from "./NewMemoModal";

function MemoRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { memoroomId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleBackButtonClick() {
    dispatch(resetNewMemoRoomId());
    navigate("/");
  }

  function handleNewMemoModalClick() {
    setIsModalOpen(true);
  }

  function handleModalCloseClick() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div>This is MemoRoom {memoroomId}</div>
      <Button text="New" onClick={handleNewMemoModalClick}/>
      {isModalOpen && <NewMemoModal isOpen={isModalOpen} setIsOpen={handleModalCloseClick} />}
      <Button onClick={handleBackButtonClick} text="Back" />
    </>
  );
}

export default MemoRoom;
