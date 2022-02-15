import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import lemon from "../assets/images/lemon.png";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0;

  .loading-title {
    font-size: 70px;
  }

  .loading-image {
    width: 50px;
    padding: 20px;
  }
`;

function Loading() {
  const [lemonImages, setLemonImages] = useState([]);
  const lemonImageNode = <img src={lemon} className="loading-image" />;

  useEffect(() => {
    const loadingLemons = setInterval(() => {
      lemonImages.length === 3
        ? setLemonImages([])
        : setLemonImages(lemonImages.concat(lemonImageNode));
    }, 500);

    return () => clearInterval(loadingLemons);
  }, [lemonImages]);

  return (
    <LoadingContainer>
      <div className="loading-title">Loading</div>
      <div className="lemon-images">
        {lemonImages.map((singleImage) => singleImage)}
      </div>
    </LoadingContainer>
  );
}

export default Loading;
