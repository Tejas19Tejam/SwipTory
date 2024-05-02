import styled from "styled-components";
import StorySlide from "./StorySlide";
import EditStoryButton from "./EditStoryButton";
import Modal from "../../ui/Modal";
import StoryView from "./StoryView";

const StoryLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  max-width: 27.9rem;
  height: 44.9rem;
  border-radius: var(--border-radius-md);
  width: 100%;
  border: none;
`;

const StyledStory = styled.button`
  overflow: hidden;
  &:last-child {
    margin-right: auto;
  }
  height: inherit;
  border: none;
  border-radius: inherit;
  width: 100%;
`;

function StoryCard({ story, onClick }) {
  // Destructuring story
  const { _id: storyId, isEditable, slides } = story || {};

  function handleStoryClick() {
    onClick?.();
  }
  return (
    <StoryLayout>
      <Modal.Open opens={storyId}>
        <StyledStory onClick={handleStoryClick}>
          <StorySlide slide={slides?.[0]} />
        </StyledStory>
      </Modal.Open>

      <Modal.Window name={storyId}>
        <StoryView story={story} />
      </Modal.Window>
      {isEditable && <EditStoryButton />}
    </StoryLayout>
  );
}

export default StoryCard;
