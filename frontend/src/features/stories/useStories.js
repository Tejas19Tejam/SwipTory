import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStories } from "../../services/apiStories";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import { useEffect, useState } from "react";

export function useStories() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  // Logic to include editable stories in "About you" category
  const [filteredStories, setFilteredStories] = useState([]);

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
    queryKey: ["stories", filterValue],
    queryFn: () => getStories(filter),
  });

  useEffect(() => {
    if (isLoading || !stories) return;

    let updatedStories = [...stories];

    if (filterValue === "all" && isAuthenticated) {
      const aboutYouStories = stories.filter((story) => story.isEditable);
      updatedStories = [
        ...aboutYouStories.map((story) => ({
          ...story,
          category: "About you",
        })),
        ...stories,
      ];
    }

    setFilteredStories(updatedStories);
  }, [isLoading, stories, filterValue, isAuthenticated]);

  return { isLoading, error, stories: filteredStories };
}
