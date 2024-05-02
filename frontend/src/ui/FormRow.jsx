import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 19rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  /* &:last-child {
    display: flex;
    padding-bottom: 0;
    justify-content: space-between;
  } */

  &:last-child div:not(:last-child) {
    display: flex;
    gap: 2.4rem;
    align-items: center;
    margin-right: auto;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }

  &:last-child:has(button) {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
  }
`;

const Label = styled.label`
  font-size: 1.8rem;
  font-weight: 600;

  &::after {
    content: " :";
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}

      {children}
      {true && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
