import styled from "styled-components";
import Button from "./Button";
import AppLogo from "./AppLogo";
import { IoMdBookmark } from "react-icons/io";
import UserAvatar from "./UserAvatar";
import Modal from "./Modal";
import CreateEditStory from "../features/stories/CreateEditStory";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 3.2rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 5px 5px var(--color-gray-200);
  /* border-bottom: 1px solid var(--shadow-sm); */
`;

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: flex-end;
  align-items: center;
`;
import SignUpForm from "../features/authentication/SignUpForm";
import LoginForm from "../features/authentication/LoginForm";
import { useAuth } from "../features/authentication/useAuth";
import Link from "./Link";

function Header() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <StyledHeader>
      <AppLogo />
      <StyledHeaderMenu>
        {/* If not log in */}
        {!isAuthenticated && (
          <>
            <Modal.Open opens="register">
              <Button>Register Now</Button>
            </Modal.Open>

            <Modal.Open opens="login">
              <Button>Login</Button>
            </Modal.Open>

            <Modal.Window name="register" hasBackground={true}>
              <SignUpForm />
            </Modal.Window>

            <Modal.Window name="login" hasBackground={true}>
              <LoginForm />
            </Modal.Window>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/bookmarks">
              <IoMdBookmark />
              <span>Bookmarks</span>
            </Link>

            <Modal.Open opens="story-create">
              <Button>Add Story</Button>
            </Modal.Open>
            <Modal.Window
              name="story-create"
              hasBackground={true}
              isClosable={true}
            >
              <CreateEditStory />
            </Modal.Window>
            <UserAvatar />
          </>
        )}
      </StyledHeaderMenu>
    </StyledHeader>
  );
}

export default Header;
