import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: ({ user, session }) => {
      // Save token and user data to local storage
      localStorage.setItem("access_token", session.access_token);

      // Update query data
      queryClient.setQueryData(["user"], user);

      // Navigate to /stories endpoint
      navigate("/stories", { replace: true });

      // Display toast
      toast.success("Account successfully created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isLoading, error };
}
