import styled from "styled-components";

export const Container = styled.div``;
export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #dadada;
  height: 56px;
  font-family: "Black Han Sans", sans-serif;
  font-size: 32px;
  padding: 8px 0 0 64px;
`;
export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 16px;
  font-size: 32px;
`;
export const TotalCount = styled.div`
  font-weight: 800;
  font-size: 24px;
  margin: 12px 0 24px 8px;

  span {
    color: #4b4bff;
  }
`;
export const Content = styled.div`
  padding: 24px;
`;
export const PostWrapper = styled.button`
  border: none;
  box-shadow: 0px 0px 10px 1px #d9d9d9;
  border-radius: 24px;
  background-color: #ffffff;
  padding: 20px 24px;
  margin-bottom: 24px;
  width: 100%;
  color: #7c818c;
  position: relative;

  & button {
    font-size: 16px;
    width: 120px;
    height: 40px;
    margin: 24px 6px 0 6px;
    border-radius: 50px;
    border: 2px solid #d9d9d9;
    background-color: transparent;
    cursor: pointer;
    transition: 0.2s;
  }
  & button:hover {
    background-color: #d9d9d9;
    color: #ffffff;
  }
  .delete_btn {
    border: 2px solid #ff5c5c;
    color: #ff5c5c;
  }
  .delete_btn:hover {
    background-color: #ff5c5c;
    color: #ffffff;
  }
  .time {
    text-align: left;
    font-size: 15px;
  }
  .company_name {
    color: #000000;
    font-weight: 800;
    font-size: 20px;
    padding-bottom: 4px;
    text-align: left;
  }
  .title {
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 4px;
    color: #000000;
    font-size: 22px;
  }
  .pay {
    font-weight: 800;
    text-align: left;
    font-size: 18px;
    color: #000000;
    margin-bottom: 24px;
    span {
      color: #e15756;
    }
  }
  .address {
    font-size: 15px;
    text-align: left;
  }
  .day {
    font-size: 15px;
    text-align: left;
    margin-bottom: 24px;
  }
  .content {
    white-space: pre-wrap;
    h3 {
      margin: 0px;
      padding: 8px 0;
    }
    textarea {
      width: 100%;
      height: 150px;
      resize: none;
    }
    text-align: left;
    font-size: 18px;
    color: #000000;
  }
`;
export const Smoke = styled.div`
  position: fixed;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const SupportModal = styled.div`
  z-index: 10;
  position: fixed;
  left: 0px;
  bottom: -600px;
  transition: 0.2s;
  width: 100%;
  background-color: #ffffff;
  height: 400px;
  border-radius: 25px 25px 0 0;
  padding-top: 120px;
  display: flex;
  justify-content: center;
  p {
    svg {
      color: #ffeb00;
      font-size: 50px;
      margin-bottom: 12px;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 400;
    font-family: "Black Han Sans", sans-serif;
    content: "지원하기";
    position: absolute;
    background-color: #ffffff;
    top: -70px;
    left: calc(50% - 75px);
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }

  &#active {
    bottom: 0px;
  }
  .user_info {
    font-family: "Jua", sans-serif;
    color: #979797;
    position: absolute;
    top: 90px;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 80px;
    justify-content: left;
  }
  .support_length {
    position: absolute;
    font-size: 22px;
    top: 120px;
    font-family: "Jua", sans-serif;
    right: 40px;
  }
  & textarea {
    resize: none;
    width: 100%;
    font-size: 24px;
    outline: none;
    border: 2px solid #dadada;
    height: 195px;
    margin: 50px 32px 0px 32px;
    padding: 20px;
    font-family: "Jua", sans-serif;
  }
  .support_submit {
    font-size: 22px;
    cursor: pointer;
    width: 100%;
    height: 74px;
    font-weight: 800;
    bottom: 0;
    left: 0;
    position: absolute;
    border: none;
    outline: none;
    background-color: #ffeb00;
  }
`;
export const SupportModalCloseBtn = styled.div`
  & svg {
    font-size: 50px;
    position: absolute;
    right: 20px;
    top: 20px;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #9095a1;
    background-color: #ebeef4;
    cursor: pointer;
  }
`;
