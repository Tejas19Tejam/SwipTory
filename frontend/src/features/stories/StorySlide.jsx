import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useEffect } from "react";

const StyledSlide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 1.8rem;
  border: none;
  height: inherit;
  background-image: linear-gradient(
      0deg,
      rgb(0, 0, 0) 20%,
      rgba(0, 0, 0, 0) 50%
    ),
    linear-gradient(rgb(0, 0, 0) 1%, rgba(0, 0, 0, 0) 20%),
    url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: inherit;
`;

const StoryTitle = styled(Heading)`
  color: var(--color-gray-0);
  padding-bottom: 0.8rem;
  margin-top: auto;
  text-align: left;

  &::first-letter {
    text-transform: capitalize;
  }
`;

const Description = styled.p`
  color: var(--color-gray-0);
  font-size: 1.6rem;
  font-weight: 500;
  text-align: initial;
  line-height: 1.9rem;
  overflow: hidden;
  height: 7.4rem;
  /* margin-bottom: 2.4rem; */

  &::first-letter {
    text-transform: capitalize;
  }
`;

function StorySlide({ slide }) {
  const { image: imageUrl, heading, description } = slide || {};

  return (
    <StyledSlide img="/cover-image.webp">
      <StoryTitle as="h2">{heading}</StoryTitle>
      <Description>{description}</Description>
    </StyledSlide>
  );
}

export default StorySlide;
