import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useEffect } from "react";

export function useUser() {
  const { data: freshUser, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (freshUser) {
      // If user data is available, update the query key
      refetch(["user", freshUser]);
    }
  }, [freshUser, refetch]);

  return { freshUser };
}
