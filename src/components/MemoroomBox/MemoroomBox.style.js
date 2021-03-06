import styled from "styled-components";

export const MemoRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 10px 20px 0;
  background: #ffc300;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);

  img {
    width: 40px;
    margin: 15px;
  }

  .menu-icon {
    width: 20px;
    margin: 7px;
    cursor: pointer;
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

    &:hover {
      cursor: pointer;
    }
  }

  .room-name {
    width: 200px;
    border: none;
    font-size: 40px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .participant-box {
    position: relative;
    justify-content: center;
    width: 300px;
    height: 50px;
    padding-top: 10px;
    background: #fefbf2;
    font-size: 15px;
  }

  .participant {
    display: flex;
    justify-content: center;
    position: absolute;
    overflow: hidden;
    width: 100%;
    top: -30%;
    left: 0;
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
    color: #ffffff;
  }

  .menu-click {
    display: flex;
    top: 0;
    right: 0;
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

  .title-edit-button,
  .delete-button {
    cursor: pointer;
  }
`;
