import styled, { css } from "styled-components";
import ButtonIcon from "../../ui/ButtonIcon";
import Row from "../../ui/Row";
import { FaHeart } from "react-icons/fa";
import { useStory } from "../stories/useStory";
import { useAuth } from "../authentication/useAuth";
import Modal from "../../ui/Modal";

const LikeButton = styled(ButtonIcon)`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  & svg {
    ${(props) =>
      props.isLiked
        ? css`
            color: red;
          `
        : css`
            color: white;
          `};
  }

  & strong {
    color: var(--color-brand-100);
  }
`;

const StyledLike = styled(Row)`
  column-gap: 1.2rem;
  & p {
    color: var(--color-gray-50);
  }
`;

function Likes() {
  const { isLiked, likesCount, onLike } = useStory();
  const { isAuthenticated } = useAuth();

  async function handleLike() {
    // If user is not authenticated, open the login modal
    if (isAuthenticated) {
      onLike();
    }
  }

  return (
    <StyledLike type="horizontal">
      {isAuthenticated ? (
        <>
          <LikeButton isLiked={isLiked} onClick={handleLike}>
            <FaHeart />
            <strong>{likesCount}</strong>
          </LikeButton>
        </>
      ) : (
        <Modal.Open opens="login">
          <LikeButton isLiked={isLiked}>
            <FaHeart />
            <strong>{likesCount}</strong>
          </LikeButton>
        </Modal.Open>
      )}
    </StyledLike>
  );
}

export default Likes;
