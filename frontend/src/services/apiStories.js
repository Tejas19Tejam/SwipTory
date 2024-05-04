import { apiRequest } from "./apiRequest";

export const getStories = async (filter) => {
  const url = `${import.meta.env.VITE_API_DOMAIN}/api/v1/stories${
    filter ? `?${filter.field}=${filter.value}` : ""
  }`;
  const result = await apiRequest({ method: "get", url });
  console.log(result);
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
