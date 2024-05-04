import React from "react";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import StoriesRow from "./StoriesRow";

import { useStories } from "./useStories";
import UserStories from "./UserStories";
import Category from "../../ui/Category";

function CategoryStories() {
  const { stories, isLoading, error, userStories } = useStories();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  const categories = [...new Set(stories.map((story) => story.category))]; // Extract unique categories from stories

  return (
    <>
      {userStories.length != 0 && <UserStories stories={userStories} />}
      {categories.map((category) => (
        <React.Fragment key={category}>
          <Category>
            <Heading as="h1">Top Stories About {category}</Heading>
            <StoriesRow
              stories={stories.filter((story) => story.category === category)}
            />
          </Category>
        </React.Fragment>
      ))}
    </>
  );
}

export default CategoryStories;
