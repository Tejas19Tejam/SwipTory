import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: freshUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { freshUser };
}
