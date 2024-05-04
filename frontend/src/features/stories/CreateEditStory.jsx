import SlideTabs from "../story-slide/SlideTabs";
import Row from "../../ui/Row";
import CreateEditStoryForm from "./CreateEditStoryForm";
import { SlideProvider } from "../story-slide/SlideProvider";

function CreateEditStory({ storyToEdit = {}, onCloseModal }) {
  return (
    <Row>
      <SlideProvider>
        <SlideTabs />
        <CreateEditStoryForm storyToEdit={storyToEdit} />
      </SlideProvider>
    </Row>
  );
}

export default CreateEditStory;
