import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "./useAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Remove the access token from local storage
      localStorage.removeItem("access_token");

      setUser(null);

      // Remove all queries from the query client
      queryClient.removeQueries();

      // Navigate to the login page
      navigate("/stories", { replace: true });

      // display toast
      toast.success("Logout successfully!");
    },
  });

  return { logout, isLoading };
}
