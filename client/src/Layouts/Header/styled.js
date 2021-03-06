import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  border: none;
  border-radius: 0 0 50px 50px;
  box-shadow: 0px 5px 5px 2px #c1c2c6;
  position: relative;
  font-family: "Jua", sans-serif;
  z-index: 100;
`;

export const Logo = styled.div`
  z-index: 100;
  padding-bottom: 12px;
  img {
    cursor: pointer;
    width: 50px;
    margin-right: 16px;
  }
  h3 {
    margin: 0px;
    padding: 0px;
    cursor: pointer;
    font-family: "Black Han Sans", sans-serif;
    font-size: 50px;
    font-weight: 400;
    display: inline-block;
  }
  #account_info {
    cursor: pointer;
    position: absolute;
    margin: 0 24px;
    top: 54px;
    right: 0px;
  }
`;

export const SearchSection = styled.div`
  border: 2px solid #c1c2c6;
  height: 50px;
  width: 95%;
  border-radius: 100px;
  position: relative;
  button {
    outline: none;
    border: none;
    background-color: #ffeb00;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 6px;
    top: 5px;
    cursor: pointer;
  }
  input {
    background-color: transparent;
    width: 85%;
    font-size: 24px;
    margin: 5px 0 0 16px;
    border: none;
    outline: none;
  }
`;
export const AccountInfoSection = styled.div`
  position: absolute;
  top: 0px;
  background-color: #ffffff;
  padding-top: 100px;
  width: 100%;
  height: 225px;
  border: none;
  border-radius: 0 0 50px 50px;
  box-shadow: 0px 8px 5px 1px #c1c2c6;

  .account_message {
    margin: 16px 40px;
    font-weight: 800;
    font-size: 24px;
  }
  button {
    width: 100%;
    font-size: 20px;
    height: 64px;
    border: none;
    outline: none;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 800;
  }
  .button_wrapper {
    margin: 0 32px;
    border-radius: 24px;
    display: flex;
    gap: 32px;
    background-color: #fef144;

    padding: 32px 44px;
  }
`;
