/* eslint-disable no-unreachable */
import styled, { css } from "styled-components";
import Row from "../../ui/Row";
import ButtonCloseIcon from "../../ui/ButtonCloseIcon";
import { RxCross2 } from "react-icons/rx";

const StyledSlideTabs = styled(Row)`
  justify-content: flex-start;
  gap: 2.4rem;
  position: relative;
  transition: all 0.4s;

  & p {
    color: var(--color-gray-600);
    position: absolute;
    font-size: 1.2rem;
    font-weight: 500;
    right: 0;
    top: 0;
  }
`;

const Tab = styled.div`
  display: flex;
  position: relative;
  border: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-lg);
  cursor: pointer;

  /* To give the same height as select */
  padding: 0.4rem;
  transition: all 0.3s;
  width: 9rem;
  height: 9rem;
  margin: 1.8rem 0;
  box-shadow: var(--shadow-lg);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-gray-200);
      color: var(--color-gray-800);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-gray-200);
    color: var(--color-gray-800);
  }

  & span {
    text-transform: capitalize;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const ButtonClose = styled(ButtonCloseIcon)`
  top: 0;
  right: 0;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

import { MAX_SLIDE_COUNT } from "../../utils/constants";
import { useSlide } from "./useSlide";

// import { useEffect, useState } from "react";

function SlideTabs() {
  const { addNewSlide, slides, removeSlide, setActiveSlide, activeSlideIndex } =
    useSlide();

  return (
    <>
      <StyledSlideTabs type="horizontal">
        <p>Add upto 6 slides</p>

        {slides.map((slide, index) => {
          return (
            <Tab
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className={activeSlideIndex === index ? "active" : ""}
              active={activeSlideIndex === index}
            >
              <span>Slide {index + 1}</span>
              {index >= 3 && ( // Render close button for all tabs greater than four
                <ButtonClose onClickCapture={() => removeSlide(index)}>
                  <RxCross2 />
                </ButtonClose>
              )}
            </Tab>
          );
        })}
        {slides.length < MAX_SLIDE_COUNT && (
          <Tab onClick={addNewSlide}>
            <span>Add +</span>
          </Tab>
        )}
      </StyledSlideTabs>
    </>
  );
}

export default SlideTabs;
