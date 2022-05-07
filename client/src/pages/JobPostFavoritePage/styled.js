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
  font-size: 32px;
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
  .company_name {
    color: #000000;
    font-weight: 800;
    font-size: 20px;
    padding-bottom: 4px;
    text-align: left;
  }
  .post_title {
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-bottom: 4px;
    color: #000000;
    font-size: 22px;
  }
  .pay {
    text-align: left;
    font-size: 18px;
    color: #7c818c;

    span {
      color: #e15756;
    }
  }
  .favorite_btn {
    cursor: pointer;
    position: absolute;
    width: 64px;
    height: 64px;
    border-radius: 0 24px 0 0;
    border: none;
    outline: none;
    top: 0;
    right: 0;
    transition: 0.2s;
    color: #ffb300;
    font-size: 32px;
  }
  .favorite_btn:hover {
    background-color: #4b4bff;
    color: #ffffff;
    width: 75px;
    height: 75px;
  }
`;
