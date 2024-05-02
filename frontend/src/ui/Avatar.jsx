import styled from "styled-components";

const StyledAvatar = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

function Avatar() {
  return (
    <StyledAvatar>
      <img src="/default-user.jpg" alt="User name" />
    </StyledAvatar>
  );
}

export default Avatar;
