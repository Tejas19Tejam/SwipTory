/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";

const initialState = {
  slides: [
    {
      heading: "",
      description: "",
      image: "",
      category: "",
    },
    {
      heading: "",
      description: "",
      image: "",
      category: "",
    },
    {
      heading: "",
      description: "",
      image: "",
      category: "",
    },
  ],
  activeSlideIndex: 0,
};

// Context
const SlideContext = createContext();

// Reducer
const slideReducer = (state, action) => {
  switch (action.type) {
    case "slide/setSlides":
      return { ...state, slides: [...action.payload.slides] };
    case "slide/update":
      const { formData } = action.payload;
      const updatedSlides = state.slides.map((slide, index) =>
        index === state.activeSlideIndex ? { ...slide, ...formData } : slide
      );
      return {
        ...state,
        slides: updatedSlides,
      };
    case "slide/addOne":
      return {
        ...state,
        slides: [...state.slides, initialState.slides[0]],
        activeSlideIndex: state.slides.length, // Add a new slide with initial state
      };
    case "slide/remove":
      const { indexToRemove } = action.payload;
      const remainingSlides = state.slides.filter(
        (slide, index) => index !== indexToRemove
      );
      const newActiveSlideIndex = Math.max(0, indexToRemove - 1); // Set the active slide index to the previous slide

      return {
        ...state,
        activeSlideIndex: newActiveSlideIndex,
        slides: remainingSlides,
      };
    case "slide/setActive":
      const { activeSlideIndex } = action.payload;
      return {
        ...state,
        activeSlideIndex,
      };
    default:
      return state;
  }
};

export const SlideProvider = ({ children }) => {
  const [{ slides, activeSlideIndex }, dispatch] = useReducer(
    slideReducer,
    initialState
  );

  return (
    <SlideContext.Provider value={{ slides, dispatch, activeSlideIndex }}>
      {children}
    </SlideContext.Provider>
  );
};

// Custom hook
export function useSlideContext() {
  const context = useContext(SlideContext);
  // context is undefined means we trying to access the value in a place that is not child component of this provider
  if (context === undefined)
    throw new Error(" SlideContext was used outside of SlideProvider");
  return context;
}
