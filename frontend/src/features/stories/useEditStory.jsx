import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editStory as apiEditStory } from "../../services/apiStories";

export function useEditStory() {
  const queryClient = useQueryClient();
  const { mutate: editStory, isLoading: isEditing } = useMutation({
    mutationFn: ({ newStory, id }) => apiEditStory(newStory, id),
    onSuccess: () => {
      toast.success("Story successfully updated");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editStory, isEditing };
}
