import styled, { css } from "styled-components";
import ButtonIcon from "../../ui/ButtonIcon";
import { IoMdBookmark } from "react-icons/io";
import { useAuth } from "../authentication/useAuth";
import Modal from "../../ui/Modal";
import { useStory } from "../stories/useStory";

const StyledBookmark = styled(ButtonIcon)`
  & svg {
    ${(props) =>
      props.isBookmarked
        ? css`
            color: #4124e4;
          `
        : css`
            color: white;
          `};
  }
`;

function BookmarkButton() {
  const { isBookmarked, onBookmark } = useStory();
  const { isAuthenticated } = useAuth();

  function handleBookmark() {
    // If user is not authenticated, open the login modal
    if (isAuthenticated) {
      // 2. Update bookmark state
      onBookmark();
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <StyledBookmark onClick={handleBookmark} isBookmarked={isBookmarked}>
          <IoMdBookmark />
        </StyledBookmark>
      ) : (
        <Modal.Open opens="login">
          <StyledBookmark isBookmarked={isBookmarked}>
            <IoMdBookmark />
          </StyledBookmark>
        </Modal.Open>
      )}
    </>
  );
}

export default BookmarkButton;
