import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";

const Link = styled(ReactLink)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-brand-50);
  background-color: var(--color-red-700);

  &:hover {
    background-color: var(--color-red-800);
  }

  font-size: 1.4rem;
  padding: 0.8rem 1.8rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  letter-spacing: 0.6px;
`;

export default Link;
