import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  gap: 2.4rem;
  padding: 0 0 1.8rem 0;
  transition: all 0.4s;
  overflow-x: auto;
  @media (max-width: 836px) {
    gap: 0.4rem;
  }
`;

const FilterButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  /* To give the same height as select */
  padding: 0.4rem;
  transition: all 0.3s;
  flex: 1 0 10%;
  /* max-width: 20.5rem; */

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  & span {
    text-transform: capitalize;
    padding: 1.2rem 1.8rem;
    font-size: 2rem;
    font-weight: 600;
    position: absolute;
    color: var(--color-gray-50);
  }

  & img {
    width: 100%;
    background-size: cover;
    background-position: center;
    border-radius: var(--border-radius-lg);
    filter: brightness(60%);
  }

  @media (max-width: 836px) {
    & span {
      font-size: 1.8rem;
      font-weight: 500;
    }
  }
`;

function Filter({ options, filterField }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.label}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          role="button"
        >
          <img
            src={`/categories/category-${option.value}.jpg`}
            alt="all category"
          />
          <span>{option.label}</span>
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
