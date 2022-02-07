import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { setTagInfo } from "../features/main/mainSlice";

const TagContainer = styled.div`
  .tag {
    border: 1px solid red;
    padding: 15px;
    border-radius: 30px;
    font-size: 20px;
    text-align: center;
    word-break: break-all;
    background-color: ${(props) => (props.isSelected ? "#fde333" : "#ffffff")};
    color: ${(props) => (props.isSelected ? "#0000ff" : "#000000")};
  }

  .tag:hover {
    background-color: gray;
    color: wheat;
    cursor: pointer;
  }
`;

function Tag({ text, isSelected }) {
  const dispatch = useDispatch();

  function handleTagClick() {
    dispatch(setTagInfo({ tag: text }));
  }

  return (
    <TagContainer isSelected={isSelected} onClick={handleTagClick}>
      <p className="tag">#{text}</p>
    </TagContainer>
  );
}

export default Tag;
