import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { debounce } from "lodash";

import Button from "./Button";
import TextInput from "./TextInput";
import ModalContainer from "./Modal";
import { logoutRequest } from "../features/auth/authSlice";
import {
  addNewMemoRoomRequest,
  setDisplayedTag,
  resetMemoRoom,
} from "../features/main/mainSlice";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 0 20px 0 45px;
`;

function Nav() {
  const [inputText, setInputText] = useState("");
  const [debounceInput, setDebounceInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useSelector((state) => state.auth.id);

  const dispatch = useDispatch();

  function handleInputTextChange({ target }) {
    setInputText(target.value);
    printvalue(target.value);
  }

  useEffect(() => {
    dispatch(setDisplayedTag({ searchedText: inputText }));
  }, [debounceInput]);

  const printvalue = useCallback(
    debounce((text) => setDebounceInput(text), 300),
    []
  );

  function handleAddMemoRoomButtonClick() {
    setIsModalOpen(true);
  }

  function handleTitleInputSubmit(event) {
    event.preventDefault();
    const { name } = event.target;

    dispatch(addNewMemoRoomRequest({ userId, name: name.value }));
    setIsModalOpen(false);
  }

  return (
    <NavContainer>
      <TextInput
        type="text"
        name="tagname"
        placeholder="Search with Tags"
        width={260}
        onInputTextChange={handleInputTextChange}
        inputText={inputText}
      />
      <div>
        <Button text="New" width={200} onClick={handleAddMemoRoomButtonClick} />
        <ModalContainer
          isOpen={isModalOpen}
          title="Memo Room Name"
          onClose={setIsModalOpen}
        >
          <form onSubmit={handleTitleInputSubmit}>
            <TextInput
              type="text"
              name="name"
              placeholder="Please Enter Name"
              width={200}
            />
            <Button text="SAVE" width={100} />
          </form>
        </ModalContainer>
        <Button
          text="logout"
          width={200}
          onClick={() => {
            dispatch(resetMemoRoom());
            dispatch(logoutRequest());
          }}
        />
      </div>
    </NavContainer>
  );
}

export default Nav;
