import { apiRequest } from "./apiRequest";

export const getStories = async (filter) => {
  const url = `${import.meta.env.VITE_API_DOMAIN}/api/v1/stories${
    filter ? `?${filter.field}=${filter.value}` : ""
  }`;
  const data = await apiRequest({ method: "get", url });

  return data;
};

export const bookmarkStory = async (storyId) => {
  const url = `${
    import.meta.env.VITE_API_DOMAIN
  }/api/v1/stories/${storyId}/bookmark`;
  try {
    const data = await apiRequest({ method: "post", url });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const likeStory = async (storyId) => {
  const url = `${
    import.meta.env.VITE_API_DOMAIN
  }/api/v1/stories/${storyId}/like`;
  try {
    const data = await apiRequest({ method: "post", url });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
