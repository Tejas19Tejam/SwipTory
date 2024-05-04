import { useSlide } from "../story-slide/useSlide";
import { useForm } from "react-hook-form";
import { useCreateStory } from "./useCreateStory";
import { useEditStory } from "./useEditStory";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useEffect } from "react";

function CreateEditStoryForm({ storyToEdit }) {
  const { createStory, isCreating } = useCreateStory();
  const { editStory, isEditing } = useEditStory();
  const isWorking = isCreating || isEditing;
  const {
    slides,
    updateSlideData,
    activeSlideIndex,
    setActiveSlide,
    setSlides,
  } = useSlide();

  const { register, setValue, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const { _id: editId, category } = storyToEdit;
  const isEditSession = Boolean(editId);

  // Populate form with data if in edit mode
  useEffect(() => {
    const isSlidesEmpty = Object.values(slides[0]).every((value) => !value);
    if (storyToEdit.slides && isSlidesEmpty) {
      setSlides(storyToEdit.slides);
    }
  }, [storyToEdit, slides, setSlides]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = { [id]: value };
    setValue(id, value); // Update form value using react-hook-form
    updateSlideData(updatedFormData);
  };

  function onSubmit() {
    const category = getValues("category");
    if (isEditSession) {
      const story = { category: category, slides };
      editStory({ newStory: story, id: editId });
    } else {
      const story = { category: category, slides };
      createStory(story);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  function handleSelectNext() {
    if (activeSlideIndex === slides.length - 1) return;
    setActiveSlide(activeSlideIndex + 1);
  }

  function handleSelectPrev() {
    if (activeSlideIndex === 0) return;
    setActiveSlide(activeSlideIndex - 1);
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Heading" error={errors?.heading?.message}>
        <Input
          type="text"
          id="heading"
          disabled={isWorking}
          placeholder="Your heading"
          {...register("heading", { required: "heading is required" })}
          onChange={handleChange}
          value={slides[activeSlideIndex].heading}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          placeholder="Story Description"
          {...register("description", { required: "description is required" })}
          onChange={handleChange}
          value={slides[activeSlideIndex].description}
        />
      </FormRow>
      <FormRow label="Image" error={errors?.image?.message}>
        <Input
          type="text"
          id="image"
          disabled={isWorking}
          placeholder="Add Image url"
          {...register(
            "image",

            { required: "image is required" }
          )}
          onChange={handleChange}
          value={slides[activeSlideIndex].image}
        />
      </FormRow>
      <FormRow label="Category" type="white" error={errors?.category?.message}>
        <Select
          id="category"
          {...register("category", { required: "category is required" })}
          onChange={handleChange}
          defaultValue={editId && category}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow>
        <div>
          <Button variation="secondary" type="reset" onClick={handleSelectPrev}>
            Previous
          </Button>
          <Button variation="secondary" onClick={handleSelectNext} type="reset">
            Next
          </Button>
        </div>
        <div>
          <Button disabled={false} type="submit">
            {isEditSession ? "Update Story" : "Post"}
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateEditStoryForm;
