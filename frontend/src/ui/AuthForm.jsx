import styled from "styled-components";
const StyledAuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
`;

function AuthForm({ children }) {
  return <StyledAuthForm>{children}</StyledAuthForm>;
}

export default AuthForm;
