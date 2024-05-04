import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../../services/apiStories";

export function useBookmarks() {
  const {
    isLoading,
    data: { result: bookmarks } = {},
    error,
  } = useQuery({
    queryKey: ["bookmark"],
    queryFn: getBookmarks,
  });

  return { isLoading, bookmarks, error };
}
