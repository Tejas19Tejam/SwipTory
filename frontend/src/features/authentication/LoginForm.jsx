import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import AuthForm from "../../ui/AuthForm";
import SpinnerMini from "../../ui/SpinnerMini";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useLogin } from "./useLogin";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// import { useLogin } from "./useLogin";
function LoginForm({ onCloseModel }) {
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;
    login(
      { username, password },
      {
        onSettled: () => {
          setUsername("");
          setPassword("");
        },
        onSuccess: () => {
          // Close the model after successfully login
          onCloseModel();
        },
      }
    );
  }

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <AuthForm>
      <Heading as="h2">Login to SwipTory</Heading>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Username">
          <Input
            type="text"
            id="username"
            // This makes this form better for password managers
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>

        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        {error && <Error>{error.message}</Error>}
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </Form>
    </AuthForm>
  );
}

export default LoginForm;
