import ProgressBar from "../../ui/ProgressBar";
import Row from "../../ui/Row";
import StorySlide from "./StorySlide";
import styled from "styled-components";

import { IoPaperPlaneOutline } from "react-icons/io5";

import Slider from "../../ui/Slider";
import Likes from "../likes/Likes";
import ButtonIcon from "../../ui/ButtonIcon";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { StoryProvider } from "./useStory";
import BookmarkButton from "../bookmark/BookmarkButton";

const StoryContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  width: 35.4rem;
  height: 57.6rem;
  box-shadow: var(--shadow-gray-sm);
  background-image: var(--linear-gradient);
  box-sizing: content-box;
  padding: 3.2rem 0 2.4rem 0;
  border-radius: var(--border-radius-md);
`;

const CommonRow = styled(Row)`
  width: 100%;
  padding: 0.4rem 1.2rem;
  position: absolute;
`;

const TopRow = styled(CommonRow)`
  top: 4.5rem;
`;

const FooterRow = styled(CommonRow)`
  position: static;
  padding: 0.4rem 3.2rem;
`;

function StoryView({ story, onCloseModel }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [filled, setFilled] = useState(0);
  const { slides: storySlides } = story;

  function handleClick() {
    onCloseModel?.();
  }

  const selectNextSlide = () => {
    if (currentSlideIndex < storySlides.length - 1) {
      setCurrentSlideIndex((prevIndex) => prevIndex + 1);
      setFilled(0); // Reset the filled state
    }
  };

  const selectPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prevIndex) => prevIndex - 1);
      setFilled(0); // Reset the filled state
    }
  };

  return (
    <StoryProvider story={story}>
      <Slider onNext={selectNextSlide} onPrev={selectPrevSlide}>
        <StoryContainer>
          <ProgressBar
            slideCount={storySlides.length}
            currentSlide={currentSlideIndex}
            setSlide={setCurrentSlideIndex}
            filled={filled}
            setFilled={setFilled}
          />
          <TopRow type="horizontal">
            <ButtonIcon onClick={handleClick}>
              <RxCross2 />
            </ButtonIcon>
            <ButtonIcon>
              <IoPaperPlaneOutline />
            </ButtonIcon>
          </TopRow>
          <StorySlide slide={storySlides[currentSlideIndex]} />
          <FooterRow type="horizontal">
            <BookmarkButton />
            <Likes />
          </FooterRow>
        </StoryContainer>
      </Slider>
    </StoryProvider>
  );
}

export default StoryView;
