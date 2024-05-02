import styled from "styled-components";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Avatar from "./Avatar";
import Button from "./Button";
import { useLogout } from "../features/authentication/useLogout";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const HamburgerMenu = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

const LogoutWindow = styled.div`
  position: fixed;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 3.2rem 4.8rem;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
  z-index: 1000;

  & p {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

function UserAvatar() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const ref = useOutsideClick(() => setOpen(false));
  const { logout } = useLogout();

  function handleMenu(e) {
    e.preventDefault();
    if (!open) {
      const rect = e.target.closest("button").getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
      return setOpen((open) => !open);
    }
    setOpen((open) => !open);
  }

  return (
    <StyledUserAvatar>
      <Avatar />
      <HamburgerMenu onClick={(e) => handleMenu(e)}>
        <FiAlignJustify />
      </HamburgerMenu>
      {open && (
        <LogoutWindow position={position} ref={ref}>
          <p>Vasudev</p>
          <Button onClick={logout}>Logout</Button>
        </LogoutWindow>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
