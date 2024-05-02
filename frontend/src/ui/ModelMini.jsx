import { createContext, useContext, useState } from "react";
import styled from "styled-components";

const ModalMiniContext = createContext();

function ModalMini({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const [position, setPosition] = useState(null);
  const open = setOpenName((name) => name);

  return (
    <ModalMiniContext.Provider
      value={{ openName, close, open, position, setPosition }}
    >
      {children}
    </ModalMiniContext.Provider>
  );
}

const StyledModel = styled.div`
  position: fixed;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

function Model({ children, name }) {
  const { openName, close, open, setPosition, position } =
    useContext(ModalMiniContext);

  if (!name) return null;

  return <StyledModel position={position}>{children}</StyledModel>;
}

function Toggle({ name }) {
  const { openName, close, open, setPosition } = useContext(ModalMiniContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openName === "" || openName !== name ? open(name) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

ModalMini.Model = Model;
ModalMini.Toggle = Toggle;
ModalMini.Window = Window;
