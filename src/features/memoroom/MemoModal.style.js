import styled from "styled-components";

export const MemoFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 550px;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);

  .error-message {
    color: #dd4a48;
  }
`;

export const MemoOptionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 20px;
  line-height: 25px;

  .memo-type-container {
    display: flex;
    width: 250px;
  }

  .memo-option-title {
    font-size: 25px;
  }

  .red-color {
    color: #ea907a;
  }

  .blue-color {
    color: #b5eaea;
  }

  .green-color {
    color: #c9e4c5;
  }

  .purple-color {
    color: #f7dbf0;
  }

  .white-color {
    color: #ffffff;
  }

  .orange-color {
    color: #ffdcb8;
  }
`;

export const SubmitButtonContainer = styled.div`
  margin: 0 auto;
`;
