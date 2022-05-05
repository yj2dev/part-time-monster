import styled from "styled-components";

export const Container = styled.div``;
export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 16px;
  font-size: 32px;
`;
export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: none;
  height: 64px;
  color: #ffffff;
  background-color: #ff6f00;
`;
export const SubTitle = styled.div`
  font-size: 24px;
  margin: 20px 0;
`;
export const WriteForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: #9f9f9f;

  input[type="text"] {
    width: 400px;
    font-size: 20px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  table {
    width: 640px;
    border: none;
  }

  table,
  tr {
    border: 1px solid #dedede;
  }

  td:first-child {
    padding-left: 12px;
  }

  td {
    height: 56px;
  }

  td span {
    font-size: 16px;
  }

  td select {
    font-size: 20px;
    outline: none;
    width: 200px;
    border: none;
  }
  .pay {
    display: flex;
    width: 200px;
    align-items: center;
    input {
      width: 150px;
    }
  }
  select {
    margin-right: 24px;
    background-color: transparent;
  }
  .recruit_number {
    display: flex;
    align-items: center;
    input {
      width: 50px;
    }
  }
  .description_input {
    margin-top: 12px;
    textarea {
      background-color: transparent;
      margin: 20px;
      width: 580px;
      height: 300px;
      resize: none;
      font-size: 20px;
      outline: none;
      border: none;
    }
  }

  .working_day {
    position: relative;
    input[type="checkbox"] {
      background-color: transparent;
      width: 16px;
      height: 16px;
    }
    label {
      margin-right: 8px;
    }
  }
  .recruit_term {
    padding: 12px 0;
  }
  .recruit_end_at {
    padding-top: 12px;
  }
`;

export const WriteSubmit = styled.div`
  width: 100%;
  position: fixed;
  background-color: #f1f2f6;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 84px;
  & button {
    font-size: 18px;
    cursor: pointer;
    width: 640px;
    height: 50px;
    border: none;
    outline: none;
    color: #ffffff;
    background-color: #ff6f00;
  }
`;

export const Space = styled.div`
  height: 100px;
`;
