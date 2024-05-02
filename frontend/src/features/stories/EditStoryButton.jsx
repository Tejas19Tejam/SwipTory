import Button from "../../ui/Button";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import Modal from "../../ui/Modal";
import CreateEditStory from "./CreateEditStory";

// const EditButtonWrapper = styled.div`
//   position: relative;
// `;

const EditButton = styled(Button)`
  position: absolute;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  transform: translateY(1.6rem);
  & svg {
    color: var(--color-gray-700);
  }
`;

function EditStoryButton({ onClick }) {
  return (
    <Modal>
      <Modal.Open opens="story-edit">
        <EditButton size="medium" variation="secondary" onClick={onClick}>
          <FaEdit />
          Edit
        </EditButton>
      </Modal.Open>
      <Modal.Window name="story-edit" hasBackground={true}>
        <CreateEditStory />
      </Modal.Window>
    </Modal>
  );
}

export default EditStoryButton;
