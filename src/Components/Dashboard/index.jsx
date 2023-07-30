import styled from "styled-components";
import { Avatar } from "antd";
const url =
  "https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=";
export const Dashboard = ({ children }) => {
  return (
    <StyledMainContainer>
      <header>
        <img
          className="logo"
          src="https://bok.to/img/bok-getreve.png"
          alt="logo"
        />
        <div>
          <Avatar size={54} src={url} />
        </div>
      </header>
      <div className="content">{children}</div>
    </StyledMainContainer>
  );
};
const StyledMainContainer = styled.div`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    height: 70px;
    box-shadow: 10px 10px 10px lightgray;

    .logo {
      width: 120px;
    }
  }
  .content {
    padding: 20px;
    height: calc(100vh - 70px);
    overflow-y: scroll;
  }
`;
