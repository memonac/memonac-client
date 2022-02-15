import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import PropTypes from "prop-types";

import {
  editMemoRoomTitleRequest,
  removeMemoRoomRequest,
} from "../../features/main/mainSlice";

import hashtag from "../../assets/images/hashtag.png";
import menu from "../../assets/images/menu.png";
import clickedMenu from "../../assets/images/click-menu.png";
import pen from "../../assets/images/pen.png";
import wastebasket from "../../assets/images/wastebasket.png";
import ModalContainer from "../Modal";
import TextInput from "../TextInput";
import Button from "../Button";
import Profile from "../Profile";

import { MemoRoomContainer } from "./MemoroomBox.style";

const MemoRoomBox = ({ id, roomName, participants, tags }) => {
  const [clickMemoRoomMenu, setClickMemoRoomMenu] = useState(false);
  const [clickMemoRoomHashTag, setClickMemoRoomHashTag] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const currentUserId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleMemoroomBoxClick() {
    navigate(`/${id}`);
  }

  function handleMenuClick() {
    setClickMemoRoomMenu(!clickMemoRoomMenu);
  }

  function handleHashtagClick() {
    setClickMemoRoomHashTag(!clickMemoRoomHashTag);
  }

  function handleWasteBasketButtonClick() {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }

  function handlePenButtonClick() {
    setIsEditModalOpen(!isEditModalOpen);
  }

  function handleTitleInputEditSubmit(event) {
    event.preventDefault();
    const { name } = event.target;

    dispatch(
      editMemoRoomTitleRequest({
        userId: currentUserId,
        memoRoomId: id,
        name: name.value,
      })
    );
    setIsEditModalOpen(false);
    setClickMemoRoomMenu(false);
  }

  function handleDeleteButtonClick() {
    dispatch(
      removeMemoRoomRequest({
        userId: currentUserId,
        memoRoomId: id,
      })
    );
    setIsDeleteModalOpen(false);
    setClickMemoRoomMenu(false);
  }

  return (
    <MemoRoomContainer>
      <div>
        <div className="menu-bar">
          <img
            src={hashtag}
            className="menu-icon"
            onClick={handleHashtagClick}
          />
          <img src={menu} className="menu-icon" onClick={handleMenuClick} />
        </div>
        <div onClick={handleMemoroomBoxClick} className="memoroom-content">
          <div className="room-name">{roomName}</div>
          <div className="participant">
            {participants.map((name) => (
              <Profile key={name} firstName={name[0]} />
            ))}
          </div>
        </div>
      </div>
      {clickMemoRoomMenu && (
        <>
          <div className="menu-click">
            <div className="menu-bar">
              <img src={hashtag} className="menu-icon" />
              <img
                src={clickedMenu}
                className="menu-icon"
                onClick={handleMenuClick}
              />
            </div>
            <div className="menu-click-content">
              <img
                className="delete-button"
                src={wastebasket}
                onClick={handleWasteBasketButtonClick}
              />
              <img
                className="title-edit-button"
                src={pen}
                onClick={handlePenButtonClick}
              />
            </div>
          </div>
          <ModalContainer
            isOpen={isEditModalOpen}
            title="Edit Room Name"
            onClose={setIsEditModalOpen}
          >
            <form onSubmit={handleTitleInputEditSubmit}>
              <TextInput
                type="text"
                name="name"
                defaultValue={roomName}
                placeholder="Please Enter Name"
                width={200}
              />
              <Button text="EDIT" width={100} />
            </form>
          </ModalContainer>
          <ModalContainer
            isOpen={isDeleteModalOpen}
            title="Delete Room"
            onClose={setIsDeleteModalOpen}
            height={200}
          >
            <div>ARE YOU GONNA DELETE THIS ROOM?</div>
            <Button
              text="DELETE"
              width={100}
              onClick={handleDeleteButtonClick}
            />
          </ModalContainer>
        </>
      )}
      {clickMemoRoomHashTag && (
        <div className="menu-click">
          <div className="menu-bar">
            <img
              src={hashtag}
              className="menu-icon"
              onClick={handleHashtagClick}
            />
            <img src={menu} className="menu-icon" />
          </div>
          <div className="menu-click-content">
            <div className="tags">
              {tags.map((tag) => {
                return (
                  <div key={tag} className="tag">
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </MemoRoomContainer>
  );
};

export default MemoRoomBox;

MemoRoomBox.propTypes = {
  id: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  tags: PropTypes.array,
  participants: PropTypes.array,
};
