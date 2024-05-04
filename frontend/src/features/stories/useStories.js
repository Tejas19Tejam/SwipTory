import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../services/apiStories";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import { useEffect, useState } from "react";

export function useStories() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  // Logic to include editable stories in "About you" category
  const [userStories, setUserStories] = useState([]);

  // FILTER
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

  useEffect(() => {
    if (isLoading || !stories) return;
    if (filterValue === "all" && isAuthenticated) {
      const userStories = stories.filter((story) => story.isEditable);
      setUserStories(userStories);
    } else {
      setUserStories([]);
    }
  }, [isLoading, stories, filterValue, isAuthenticated]);

  return { isLoading, error, stories, userStories };
}
