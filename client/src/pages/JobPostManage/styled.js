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
    font-weight: 800;
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
    margin-bottom: 32px;

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

  .support_title {
    font-size: 24px;
    padding: 24px 0;
    border-top: 2px solid #eeeeee;
  }

  .support_count {
    font-size: 20px;
    position: relative;
    padding-top: 12px;
  }

  .post_no {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 0;
    width: 200px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    border-radius: 0 24px 0 4px;
    background-color: rgba(0, 0, 0, 0.5);
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
export const SupportWrapper = styled.ul`
  margin-top: 20px;
  //background-color: #fff231;
  background-color: #f1f2f6;
  //box-shadow: 0px 4px 5px 1px #c1c2c6;
  border: none;
  padding: 20px;
  border-radius: 24px;
  white-space: pre-wrap;
  position: relative;

  table {
    tr {
      td:first-child {
        width: 180px;
      }
      td {
        vertical-align: top;
        height: 38px;
        //border: 1px solid red;
      }
      td:last-child {
        color: #000000;
      }
    }
  }
  .support_no {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 0;
    width: 136px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    border-radius: 0 24px 0 4px;
    background-color: rgba(255, 0, 0, 0.5);
  }

  li {
    position: relative;
    box-shadow: 0px 4px 5px 1px #c1c2c6;
    margin-bottom: 20px;
    text-align: left;
    font-size: 20px;
    padding: 24px;
    border: none;
    background-color: #fff231;
    border-radius: 24px;
  }

  li:last-child {
    margin: 0px;
  }
`;
