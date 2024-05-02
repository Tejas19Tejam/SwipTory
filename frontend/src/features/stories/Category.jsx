import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ErrorFallback from "../../ui/ErrorFallback";
import StoriesRow from "./StoriesRow";
import React, { useEffect } from "react";

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

const categories = [
  "food",
  "health and Fitness",
  "travel",
  "movie",
  "education",
];

import { useStories } from "./useStories";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

function Category() {
  const { stories, isLoading, error } = useStories();

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  const categories = [...new Set(stories.map((story) => story.category))]; // Extract unique categories from stories

  // Get filtered stories by category
  const filteredStories = categories.map((category) => {
    const categoryStories = stories.filter(
      (story) => story.category === category
    );
    return { category, stories: categoryStories };
  });

  if (!categories.includes(category) && filteredStories.length === 0)
    return <Empty category={category} />;

  return filteredStories.map((story) => {
    return (
      <React.Fragment key={story.category}>
        <StyledCategory>
          <Heading as="h1">Top Stories About {story.category}</Heading>
          <StoriesRow stories={story.stories} />
        </StyledCategory>
      </React.Fragment>
    );
  });
}

export default Category;
