import React, { useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import hashtag from "../../assets/images/hashtag.png";
import menu from "../../assets/images/menu.png";
import clickedMenu from "../../assets/images/click-menu.png";
import pen from "../../assets/images/pen.png";
import wastebasket from "../../assets/images/wastebasket.png";
import EditRoomTitleModal from "./EditRoomTitleModal";
import Profile from "../Profile";
import { MemoRoomContainer } from "./MemoroomBox.style";
import DeleteRoomModal from "./DeleteRoomModal";

const MemoRoomBox = ({ id, roomName, participants, tags }) => {
  const [clickMemoRoomMenu, setClickMemoRoomMenu] = useState(false);
  const [clickMemoRoomHashTag, setClickMemoRoomHashTag] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
          <div className="participant-box">
            <div className="participant">
              {participants &&
                participants.map((name) => (
                  <Profile key={name} firstName={name[0]} />
                ))}
            </div>
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
          <EditRoomTitleModal
            id={id}
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            setIsMenuOpen={setClickMemoRoomMenu}
            roomName={roomName}
          />
          <DeleteRoomModal
            id={id}
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
          />
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

MemoRoomBox.propTypes = {
  id: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  tags: PropTypes.array,
  participants: PropTypes.array,
};

export default MemoRoomBox;
