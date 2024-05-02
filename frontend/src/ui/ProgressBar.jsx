import { useEffect, useState } from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  width: 92%;
  column-gap: 1.8rem;
`;

const StyledProgress = styled.div`
  transition: width 0.3s;
  width: 100%;
  height: 0.3rem;
  background-color: var(--color-gray-600);
  border-radius: var(--border-radius-md);

  & div {
    width: ${(props) => props.filled}%;
    height: inherit;
    background-color: var(--color-gray-0);
    border: none;
    border-radius: inherit;
  }
`;
function ProgressBar({
  slideCount,
  currentSlide,
  setSlide,
  filled,
  setFilled,
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (filled < 100) {
        setFilled((prev) => prev + 1);
      }

      if (filled === 100) {
        if (currentSlide === slideCount - 1) {
          console.log(currentSlide);
          clearInterval(interval); // Clear interval only on the last slide
          return null;
        }
        setSlide((prevIndex) => prevIndex + 1);
        setFilled(0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [filled, slideCount, currentSlide, setSlide, setFilled]);

  return (
    <Bar columns={slideCount}>
      {Array.from({ length: slideCount }, (_, index) => (
        <StyledProgress
          filled={
            currentSlide === index ? filled : currentSlide > index ? 100 : 0
          }
          key={index}
        >
          <div></div>
        </StyledProgress>
      ))}
    </Bar>
  );
}

export default ProgressBar;
