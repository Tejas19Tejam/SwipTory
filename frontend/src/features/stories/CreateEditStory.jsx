import SlideTabs from "./../story-slide/SlideTabs";
import Row from "../../ui/Row";
import { useEffect, useState } from "react";

import CreateEditStoryForm from "./CreateEditStoryForm";

// TEMP

import { SlideProvider } from "../story-slide/SlideProvider";
const slide1 = {
  heading: "Explore the Beauty of Nature",
  description: "Witness breathtaking landscapes and natural wonders.",
  imageUrl: "https://example.com/slide1-image.jpg",
  category: "Travel",
};

const slide2 = {
  heading: "Healthy Living Tips",
  description: "Learn valuable tips for maintaining a healthy lifestyle.",
  imageUrl: "https://example.com/slide2-image.jpg",
  category: "Health and Fitness",
};

const slide3 = {
  heading: "The Art of Cooking",
  description: "Discover delicious recipes and culinary techniques.",
  imageUrl: "https://example.com/slide3-image.jpg",
  category: "Food",
};

function CreateEditStory({ storyToEdit = {}, onCloseModal }) {
  return (
    <Row>
      <SlideProvider>
        <SlideTabs />
        <CreateEditStoryForm />
      </SlideProvider>
    </Row>
  );
}

export default CreateEditStory;

// const { slide } = useSlide(slideIndex) ;
