import React, { useState } from "react";

import PropTypes from "prop-types"
import styled from "styled-components";
import close from "../assets/images/close.png";

const MemoContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: lightgray;

  .close {
    position: absolute;
    width: 10px;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }

  textarea {
    box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.75);
    outline: none;
    border: none;
    min-width: 165px;
    min-height: 145px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    padding: 40px 25px 25px 25px;
    background-color: ${(props) => props.color};
    font-size: 20px;
    overflow: hidden;
  }

  .main-image {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.75);
    background-color: white;
    margin: 30px;
  }

  .memo-info-wrapper {
    position: relative;

    p {
      margin: 5px 0;
      font-size: 15px;
      font-weight: 900;
    }
  }
`;
// location, size, color, content, tags, alarmDate 
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
      <img className="close" src={close} />
      {info.formType === "text"
        && <textarea
            placeholder="Write.."
            value={text}
            onChange={handleTextChange}
           />
      }
      {info.formType === "image"
        && <div>
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