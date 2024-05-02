import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
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

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-gray-800);
    background: var(--color-gray-0);
    border: 1px solid var(--color-gray-200);

    &:hover {
      background-color: var(--color-gray-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
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
  ${(props) => variations[props.variation]}


  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-gray-100);
  }
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
