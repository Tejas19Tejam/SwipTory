import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 1.8rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const colors = {
  red: css`
    color: var(--color-brand-50);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  green: css`
    color: var(--color-brand-50);
    background-color: var(--color-green-700);

    &:hover {
      background-color: var(--color-green-800);
    }
  `,
  blue: css`
    color: var(--color-brand-50);
    background-color: var(--color-blue-700);
    &:hover {
      background-color: var(--color-blue-800);
    }
  `,
  plain: css`
    color: var(--color-gray-800);
    background: var(--color-gray-0);
    border: 1px solid var(--color-gray-200);

    &:hover {
      background-color: var(--color-gray-50);
    }
  `,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  letter-spacing: 0.6px;

  ${(props) => sizes[props.size]}
  ${(props) => colors[props.color]}



  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-gray-100);
  }
`;

Button.defaultProps = {
  size: "medium",
  color: "red",
};

export default Button;
