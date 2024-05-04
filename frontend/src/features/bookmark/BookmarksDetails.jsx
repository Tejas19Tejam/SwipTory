import Category from "../../ui/Category";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import StoriesRow from "../stories/StoriesRow";
import { useBookmarks } from "./useBookmarks";

function BookmarksDetails() {
  const { isLoading, bookmarks } = useBookmarks();

  if (isLoading) return <Spinner />;
  if (!bookmarks) return <Empty />;

  return (
    <Category>
      <h1>Bookmarks Details</h1>
      <StoriesRow stories={bookmarks} />
    </Category>
  );
}

export default BookmarksDetails;
