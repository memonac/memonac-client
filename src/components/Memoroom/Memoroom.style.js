import styled from "styled-components";

export const MemoRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  background: #ffc300;

  img {
    width: 40px;
    margin: 15px;
  }
  .menu-icon {
    width: 20px;
    margin: 7px;
  }

  .menu-bar {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 300px;
  }

  .memoroom-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 220px;
    margin-top: 80px;
  }

  .room-name {
    border: none;
    font-size: 25px;
  }

  .participant {
    display: flex;
    justify-content: center;
    width: 300px;
    height: 50px;
    border-top: 1px solid black;
    background: #fefbf2;
    font-size: 15px;
  }

  .tags {
    display: flex;
    justify-content: center;
    width: 200px;
    height: 100px;
    font-size: 15px;
  }

  .tag {
    margin: 3px;
    color: white;
  }

  .menu-click {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, 0.6);
  }

  .menu-click-content {
    margin-top: 100px;
  }
`;
