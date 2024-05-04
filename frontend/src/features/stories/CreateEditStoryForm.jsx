import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createStory } from "../../services/apiStories";
import { useSlide } from "../story-slide/useSlide";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

function CreateEditStoryForm() {
  const queryClient = useQueryClient();
  const { register, setValue, handleSubmit, formState } = useForm();
  const { slides, updateSlideData, activeSlideIndex, setActiveSlide } =
    useSlide();
  const { errors } = formState;

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = { [id]: value };
    setValue(id, value); // Update form value using react-hook-form
    updateSlideData(updatedFormData);
  };

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      toast.success("New story successfully created");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit() {
    const story = { category: slides[0].category, slides };
    console.log(story);
    mutate(story);
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
          disabled={false}
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
          disabled={false}
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
          disabled={false}
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
          value={slides[0].category}
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
            Post
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateEditStoryForm;
