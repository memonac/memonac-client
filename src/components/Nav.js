import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { debounce } from "lodash";

import Button from "../components/Button";
import TextInput from "./TextInput";
import { logoutRequest } from "../features/auth/authSlice";
import { setDisplayedTag } from "../features/main/mainSlice";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Nav() {
  const [inputText, setInputText] = useState("");
  const [debounceInput, setDebounceInput] = useState("");

  const dispatch = useDispatch();

  function handleInputTextChange({ target }) {
    setInputText(target.value);
    printvalue(target.value);
  }

  useEffect(() => {
    dispatch(setDisplayedTag({ searchedText: inputText }));
  }, [debounceInput]);

  const printvalue = useCallback(
    debounce((val) => 
      setDebounceInput(val)
    , 300), 
    []
  );

  return (
    <NavContainer>
      <TextInput
        type="text"
        name="tagname"
        placeholder="검색할 태그를 입력해주세요."
        width={260}
        onInputTextChange={handleInputTextChange}
        inputText={inputText}
      />
      <Button
        text="logout"
        width={200}
        onClick={() => {
          dispatch(logoutRequest());
        }}
      />
    </NavContainer>
  );
}

export default Nav;
