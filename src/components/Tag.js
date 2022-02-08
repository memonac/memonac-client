import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import PropTypes from "prop-types";

import { setTagInfo } from "../features/main/mainSlice";

const TagContainer = styled.div`
  .tag {
    padding: 10px;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    word-break: break-all;
    background-color: ${(props) => (props.isSelected ? "#8c0000" : "#ffffff")};
    color: ${(props) => (props.isSelected ? "#fbe6c2" : "#000000")};
  }

  .tag:hover {
    background-color: #ffd57e;
    color: #000000;
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

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
