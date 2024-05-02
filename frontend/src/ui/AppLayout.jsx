// import "./AppLayout.css";
import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Modal from "./Modal";

const Main = styled.main`
  padding: 4rem 3.2rem 6.4rem;
`;

function AppLayout() {
  return (
    <Modal>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Modal>
  );
}

export default AppLayout;
