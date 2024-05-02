import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStories } from "../../services/apiStories";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";

export function useStories() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  // // FILTER
  const filterValue = searchParams.get("category") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "category", value: filterValue };

  // QUERY
  const {
    isLoading,
    data: { result: stories } = {},
    error,
  } = useQuery({
    queryKey: ["stories", filterValue, isAuthenticated],
    queryFn: () => getStories(filter),
  });

  return { isLoading, error, stories };
}
