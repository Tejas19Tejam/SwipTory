import styled from "styled-components";
import Row from "../../ui/Row";
import Category from "./Category";
import StoriesFilter from "./StoriesFilter";

const StyledCategoryRow = styled(Row)`
  margin-bottom: 2.4rem;
`;

function Categories() {
  return (
    <StyledCategoryRow>
      <StoriesFilter />
      <Category />
    </StyledCategoryRow>
  );
}

export default Categories;
