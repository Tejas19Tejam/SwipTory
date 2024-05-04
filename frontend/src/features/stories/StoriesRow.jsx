import styled from "styled-components";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import StoryCard from "./StoryCard";
import StoryView from "./StoryView";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 125rem;
  width: 100%;
  column-gap: 3.2rem;
  row-gap: 4.8rem;
  transition: height 0.8s;
`;

import React, { useState } from "react";

function StoriesRow({ stories }) {
  const [visibleStories, setVisibleStories] = useState(4);
  const [showMore, setShowMore] = useState(false);

  const toggleVisibility = () => {
    setShowMore(!showMore);
    setVisibleStories(showMore ? 4 : stories.length);
  };

  const showToggleButton = stories.length > 4;

  return (
    <>
      <Container>
        {stories.slice(0, visibleStories).map((story) => (
          <React.Fragment key={story._id}>
            <StoryCard story={story} />
          </React.Fragment>
        ))}
      </Container>
      {showToggleButton && (
        <Button size="large" onClick={toggleVisibility}>
          {showMore ? "Show Less" : "See More"}
        </Button>
      )}
      {stories.length === 0 && <Empty />}
    </>
  );
}

export default StoriesRow;
