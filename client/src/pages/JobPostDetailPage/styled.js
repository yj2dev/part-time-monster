import styled from "styled-components";

export const Container = styled.div`
  .detail_page_title {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #dadada;
    height: 56px;
    font-family: "Black Han Sans", sans-serif;
    font-size: 32px;
    padding: 8px 0 0 64px;
  }
  .favorite {
    position: absolute;
    top: 12px;
    right: 32px;
    font-size: 32px;
  }
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 16px;
  font-size: 32px;
`;
export const JobPostWrapper = styled.div`
  font-size: 20px;
  font-weight: 800;
  .content {
    background-color: #ffffff;
    padding: 30px 24px;
    margin-bottom: 24px;
    box-shadow: 0px 2px 4px 1px #cccccc;
    .sub_title {
      font-size: 24px;
      margin-bottom: 24px;
    }
    table {
      font-size: 20px;
    }
    td:first-child {
      height: 38px;
      width: 120px;
      color: #626262;
    }
    .description {
      white-space: pre-wrap;
      line-height: 32px;
    }
  }
  .info {
    .company_name {
      font-size: 24px;
      color: red;
      margin-bottom: 12px;
    }
    .title {
      font-size: 32px;
      margin-bottom: 8px;
    }
    .created_at {
      color: #979797;
      margin-bottom: 8px;
    }
    .info_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px;
      gap: 12px;
    }
    .info_item_wrapper {
      display: flex;
      justify-content: space-between;
    }
    .pay {
      color: #c57d24;
    }
  }
`;
