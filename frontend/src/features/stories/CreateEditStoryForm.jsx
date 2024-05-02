import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
// import { useStorySlides } from "../story-slide/useStorySlides";

const options = [
  {
    label: "Select category",
    value: "",
  },
  {
    label: "Food",
    value: "food",
  },
  { label: "Health and Fitness", value: "health and fitness" },
  { label: "Travel", value: "travel" },
  { label: "Movies", value: "movie" },
  { label: "Education", value: "education" },
];
function CreateEditStoryForm({ activeSlide }) {
  return (
    <Form type="modal">
      <FormRow label="Heading" error="">
        <Input
          type="text"
          id="heading"
          disabled={false}
          placeholder="Your heading"
        />
      </FormRow>
      <FormRow label="Description" error={false}>
        <Textarea
          type="text"
          id="description"
          disabled={false}
          placeholder="Story Description"
        />
      </FormRow>
      <FormRow label="Image" error={false}>
        <Input
          type="text"
          id="image"
          disabled={false}
          placeholder="Add Image url"
        />
      </FormRow>
      <FormRow label="Image" error={false} type="white">
        <Select options={options} value={options[0]} />
      </FormRow>
      <FormRow>
        <div>
          <Button variation="secondary" type="reset">
            Previous
          </Button>
          <Button variation="secondary" type="reset">
            Next
          </Button>
        </div>
        <div>
          <Button disabled={false}>Post</Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateEditStoryForm;
