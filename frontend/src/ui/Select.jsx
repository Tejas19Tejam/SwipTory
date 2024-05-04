import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-gray-100)"
        : "var(--color-gray-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const options = [
  {
    label: "Select category",
    value: "",
  },
  {
    label: "Food",
    value: "food",
  },
  { label: "Health and Fitness", value: "health and fitness" },
  { label: "Travel", value: "travel" },
  { label: "Movies", value: "movie" },
  { label: "Education", value: "education" },
];

function Select({ value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
