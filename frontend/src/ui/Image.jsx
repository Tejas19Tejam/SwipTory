import styled from "styled-components";

const StyledImage = styled.img`
  display: block;
  object-fit: cover;
  height: inherit;
  border-radius: inherit;
`;

function Image({ imagePath }) {
  return <StyledImage src={imagePath} />;
}

export default Image;
