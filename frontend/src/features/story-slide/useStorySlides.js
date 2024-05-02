import { useEffect, useState } from "react";

// Data coming from useStories hook
import { stories } from "../../data/data-stories";

export function useStorySlides(storyId = "") {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slides, setSlides] = useState(stories[0].slides || []);
  const [activeSlide, setActiveSlide] = useState({});

  useEffect(() => {
    if (slides.length === activeSlideIndex) {
      setActiveSlideIndex(() => slides.length - 1);
    }
  }, [activeSlideIndex, slides]);

  useEffect(() => {
    setActiveSlide(slides.at(activeSlideIndex));
  }, [activeSlideIndex, slides]);

  //   useEffect(() => {
  //     if (curStory === "") return null;
  //     const curStory = stories.find((story) => story.id === storyId);
  //     setSlides(curStory.slides);
  //   }, [storyId]);

  return {
    slides,
    setSlides,
    setActiveSlide,
    activeSlide,
    activeSlideIndex,
    setActiveSlideIndex,
  };
}
