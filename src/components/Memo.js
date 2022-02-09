import React, { useState } from "react";

import PropTypes from "prop-types"
import styled from "styled-components";
import close from "../assets/images/close.png";

const MemoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: ${(props) => props.color};
  min-width: 250px;
  min-height: 250px;
  max-width: 500px;
  max-height: 500px;

  box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.75);
  overflow: hidden;
  resize: both;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  .close {
    margin-top: 10px;
    margin-right: 10px;
    width: 10px;
    float: right;
    cursor: pointer;
  }

  textarea {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    padding-left: 15px;
    background-color: ${(props) => props.color};
    font-size: 20px;
    resize: none;
    box-sizing: border-box;
  }

  .main-image {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.75);
    background-color: white;
    margin: 30px;
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
    >
      <div>
        <img className="close" src={close} />
      </div>
      {info.formType === "text"
        && <div className="textarea-wrapper">
            <textarea
              placeholder="Write.."
              value={text}
              onChange={handleTextChange}
            />
          </div>
      }
      {info.formType === "image"
        && <div className="textarea-wrapper">
            <img className="main-image" src={close} />
           </div>
      }
      <div className="memo-info-wrapper">
        <p>#(Tag): {tag}</p>
        <p>{info.alarmDate}</p>
      </div>
    </MemoContainer>
  );
}

Memo.propTypes = {

};

export default Memo;