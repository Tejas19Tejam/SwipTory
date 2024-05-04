import Category from "../../ui/Category";
import Heading from "../../ui/Heading";
import StoriesRow from "./StoriesRow";

function UserStories({ stories }) {
  return (
    <Category>
      <Heading as="h1">Your Stories</Heading>
      <StoriesRow stories={stories} />
    </Category>
  );
}

export default UserStories;
