import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 1fr;
  gap: 1.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const InputAndError = styled.div`
  display: flex;
  flex-direction: column;
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
}

export default FormRowVertical;
