import styled from "styled-components";
import Row from "./Row";

const Category = styled(Row)`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid var(--color-gray-200);
  padding-bottom: 2.4rem;

  & button {
    margin-top: 1.8rem;
  }
`;

export default Category;
