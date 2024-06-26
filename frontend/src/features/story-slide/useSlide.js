import { useSlideContext } from "./SlideProvider";

export const useSlide = () => {
  const { slides, dispatch, activeSlideIndex } = useSlideContext();

  const updateSlideData = (formData) => {
    dispatch({ type: "slide/update", payload: { formData } });
  };

  const addNewSlide = () => {
    dispatch({ type: "slide/addOne" });
  };

  const setSlides = (slides) => {
    dispatch({ type: "slide/setSlides", payload: { slides } });
  };

  const removeSlide = (indexToRemove) => {
    dispatch({ type: "slide/remove", payload: { indexToRemove } });
  };

  const setActiveSlide = (activeSlideIndex) => {
    dispatch({ type: "slide/setActive", payload: { activeSlideIndex } });
  };

  return {
    slides,
    updateSlideData,
    addNewSlide,
    removeSlide,
    setActiveSlide,
    activeSlideIndex,
    setSlides,
  };
};
