import React from "react";
import { useParams } from "react-router";

function MemoRoom() {
  const { memoroomId } = useParams();

  return <div>This is MemoRoom {memoroomId}</div>;
}

export default MemoRoom;
