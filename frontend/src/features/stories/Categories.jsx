import styled from "styled-components";
import Row from "../../ui/Row";
import CategoryStories from "./CategoryStories";
import StoriesFilter from "./StoriesFilter";

const StyledCategoryRow = styled(Row)`
  margin-bottom: 2.4rem;
`;

function Categories() {
  return (
    <StyledCategoryRow>
      <StoriesFilter />
      <CategoryStories />
    </StyledCategoryRow>
  );
}

export default Categories;
