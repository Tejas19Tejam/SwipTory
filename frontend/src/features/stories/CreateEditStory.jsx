import SlideTabs from "./../story-slide/SlideTabs";
import Row from "../../ui/Row";
import { useEffect, useState } from "react";

import CreateEditStoryForm from "./CreateEditStoryForm";

// TEMP

import { stories } from "../../data/data-stories";

function CreateEditStory({ storyToEdit = {}, onCloseModal }) {
  const [slides, setSlides] = useState(stories);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleActiveSlide = (slideId) => {
    setActiveSlideIndex(slideId);
  };

  const handleRemoveSlide = (slideId) => {
    const indexToRemove = slides.findIndex((slide) => slide.id === slideId);
    if (indexToRemove === -1) return; // Slide not found

    const newSlides = slides.filter((slide) => slide.id !== slideId);
    setSlides(newSlides);

    // If the active slide is removed, adjust the activeSlideIndex
    if (indexToRemove === activeSlideIndex) {
      const newIndex = Math.min(indexToRemove, newSlides.length - 1);
      setActiveSlideIndex(newIndex);
    } else if (activeSlideIndex > indexToRemove) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Math.random(), // Generate unique ID
      story_id: 1,
      image_url: "",
      caption: "",
      content: "",
    };

    setSlides((prevSlides) => [...prevSlides, newSlide]);
  };

  return (
    <Row>
      <SlideTabs
        slides={slides}
        activeSlideIndex={activeSlideIndex}
        onSlideClick={handleActiveSlide}
        onRemoveSlide={handleRemoveSlide}
        onAddSlide={handleAddSlide}
      />
      <CreateEditStoryForm activeSlide={slides[activeSlideIndex]} />
    </Row>
  );
}

export default CreateEditStory;

// const { slide } = useSlide(slideIndex) ;
