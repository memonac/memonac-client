import React, { useState } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import close from "../assets/images/close.png";

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  min-width: 250px;
  min-height: 250px;
  max-width: 500px;
  max-height: 500px;
  background-color: ${(props) => props.color};
  box-shadow: 10px 10px 24px 0px rgba(0, 0, 0, 0.75);
  resize: both;

  .close {
    float: right;
    width: 10px;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding-left: 15px;
    outline: none;
    border: none;
    box-sizing: border-box;
    background-color: ${(props) => props.color};
    font-size: 20px;
    resize: none;
  }

  .image {
    width: 300px;
    height: 300px;
    background-image: url(${(props) => props.imageUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: "#ffffff";
    resize: none;
  }

  .memo-info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    p {
      margin: 5px 0;
      font-size: 15px;
      font-weight: 900;
    }
  }

  .textarea-wrapper {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

function Memo({ info, tag }) {
  const [text, setText] = useState(info.content);

  function handleTextChange({ target }) {
    setText(target.value);
  }

  return (
    <MemoContainer
      left={info.location[0]}
      top={info.location[1]}
      width={info.size[0]}
      height={info.size[1]}
      color={info.color}
      imageUrl={close}
    >
      <div>
        <img className="close" src={close} />
      </div>
      {info.formType === "text" && (
        <div className="textarea-wrapper">
          <textarea
            placeholder="Write.."
            value={text}
            onChange={handleTextChange}
          />
        </div>
      )}
      {info.formType === "image" && (
        <div className="textarea-wrapper image"></div>
      )}
      <div className="memo-info-wrapper">
        <p>#(Tag): {tag}</p>
        <p>{info.alarmDate}</p>
      </div>
    </MemoContainer>
  );
}

Memo.propTypes = {
  info: PropTypes.shape({
    location: PropTypes.array.isRequired,
    size: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    formType: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    alarmDate: PropTypes.string.isRequired,
  }).isRequired,
  tag: PropTypes.string.isRequired,
};

export default Memo;
