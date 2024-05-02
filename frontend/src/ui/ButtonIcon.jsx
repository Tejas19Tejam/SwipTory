import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background: none;
  }

  &:focus {
    outline: none;
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-gray-50);
  }
`;

export default ButtonIcon;
