import styled from "styled-components";
import Row from "../../ui/Row";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import StoriesRow from "./StoriesRow";

import { useStories } from "./useStories";

const StyledCategory = styled(Row)`
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
function Category() {
  const { stories, isLoading, error } = useStories();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  const categories = [...new Set(stories.map((story) => story.category))]; // Extract unique categories from stories

  return (
    <>
      {categories.map((category) => (
        <React.Fragment key={category}>
          <StyledCategory>
            <Heading as="h1">Top Stories About {category}</Heading>
            <StoriesRow
              stories={stories.filter((story) => story.category === category)}
            />
          </StyledCategory>
        </React.Fragment>
      ))}
    </>
  );
}

export default Category;
