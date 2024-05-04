import { apiRequest } from "./apiRequest";

export const getStories = async (filter) => {
  const url = `${import.meta.env.VITE_API_DOMAIN}/api/v1/stories${
    filter ? `?${filter.field}=${filter.value}` : ""
  }`;
  const result = await apiRequest({ method: "get", url });
  return result;
};

export const createStory = async (data) => {
  const url = `${import.meta.env.VITE_API_DOMAIN}/api/v1/stories`;
  try {
    const result = await apiRequest({ method: "post", url, data });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editStory = async (data, id) => {
  const url = `${import.meta.env.VITE_API_DOMAIN}/api/v1/stories/${id}`;
  try {
    const result = await apiRequest({ method: "patch", url, data });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const bookmarkStory = async (storyId) => {
  const url = `${
    import.meta.env.VITE_API_DOMAIN
  }/api/v1/stories/${storyId}/bookmark`;
  try {
    const result = await apiRequest({ method: "post", url });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBookmarks = async () => {
  const url = `${import.meta.env.VITE_API_DOMAIN}/api/v1/users/bookmarks`;
  const result = await apiRequest({ method: "get", url });
  return result;
};

export const likeStory = async (storyId) => {
  const url = `${
    import.meta.env.VITE_API_DOMAIN
  }/api/v1/stories/${storyId}/like`;
  try {
    const result = await apiRequest({ method: "post", url });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
