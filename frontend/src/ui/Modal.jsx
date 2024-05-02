import styled, { css } from "styled-components";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import ButtonCloseIcon from "./ButtonCloseIcon";

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) =>
    props.hasBackground &&
    css`
      background-color: var(--color-gray-50);
    `}
  /* background-color: var(--color-gray-50); */
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 4.8rem 4rem;
  transition: all 0.5s;
  width: 100%;

  &:has(button) {
    max-width: 100rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  /* backdrop-filter: blur(1px); */
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled(ButtonCloseIcon)`
  top: 1.2rem;
  right: 1.9rem;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, ...style }) {
  const { openName, close } = useContext(ModalContext);
  // const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal hasBackground={style.hasBackground}>
        {style.hasBackground && (
          <Button onClick={close}>
            <HiXMark />
          </Button>
        )}

        {cloneElement(children, { onCloseModel: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
