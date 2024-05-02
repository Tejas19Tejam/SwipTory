import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Heading = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

function AppLogo() {
  return (
    <NavLink to="/">
      <Heading>SwipTory</Heading>
    </NavLink>
  );
}

export default AppLogo;
