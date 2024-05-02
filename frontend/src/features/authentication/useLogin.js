import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "./useAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: ({ session, user }) => {
      // Save token and user data to local storage
      localStorage.setItem("access_token", session.access_token);

      setUser(user);

      // Update query data
      queryClient.setQueryData(["user"], user);

      // Navigate to /stories endpoint
      navigate("/stories", { replace: true });

      // Display toast
      toast.success("Login successfully !");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}
