import styled from "styled-components";

const ButtonCloseIcon = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    outline: 2px solid var(--color-red-700);
    border-radius: var(--border-radius-lg);
    width: 2.2rem;
    height: 2.2rem;
    fill: var(--color-red-700);
    /* stroke: var(--color-grey-500);
    color: var(--color-gray-500); */
  }
`;

export default ButtonCloseIcon;
