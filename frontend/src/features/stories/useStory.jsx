import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { bookmarkStory, likeStory } from "../../services/apiStories";

const StoryContext = createContext();

export const StoryProvider = ({ children, story }) => {
  const { _id: id, isBookmarked, isLiked, likesCount, category } = story;
  const queryClient = useQueryClient();

  async function handleBookmark() {
    // 1. Bookmark the story
    const { bookmarked } = await bookmarkStory(id);
    console.log(bookmarked);

    queryClient.invalidateQueries({
      queryKey: ["stories"],
    });
  }

  async function handleLike() {
    // 1. Like the story
    const { liked } = await likeStory(id);
    console.log(liked);

    queryClient.invalidateQueries({
      queryKey: ["stories"],
    });
  }

  const contextValue = {
    isBookmarked,
    isLiked,
    likesCount,
    id,
    category,
    onBookmark: handleBookmark,
    onLike: handleLike,
  };

  return (
    <StoryContext.Provider value={contextValue}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStoryContext must be used within a StoryProvider");
  }
  return context;
};
