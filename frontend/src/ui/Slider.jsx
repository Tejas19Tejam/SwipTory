import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ButtonIcon from "./ButtonIcon";

const StyledSlider = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-evenly;
  /* max-width: 120rem; */
  /* width: 100%; */
`;

const SliderButton = styled(ButtonIcon)`
  position: absolute;
  & svg {
    color: var(--color-gray-50);
    width: 6.2rem;
    height: 6.2rem;
  }
`;

const ButtonPrev = styled(SliderButton)`
  left: -50%;
`;

const ButtonNext = styled(SliderButton)`
  right: -45%;
`;

function Slider({ onNext, onPrev, children }) {
  return (
    <StyledSlider>
      <ButtonPrev onClick={onPrev}>
        <MdArrowBackIosNew />
      </ButtonPrev>
      {children}
      <ButtonNext onClick={onNext}>
        <MdOutlineArrowForwardIos />
      </ButtonNext>
    </StyledSlider>
  );
}

export default Slider;
