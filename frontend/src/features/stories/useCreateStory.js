import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createStory as apiCreateStory } from "../../services/apiStories";

export function useCreateStory() {
  const queryClient = useQueryClient();
  const { mutate: createStory, isLoading: isCreating } = useMutation({
    mutationFn: apiCreateStory,
    onSuccess: () => {
      toast.success("New story successfully created");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createStory, isCreating };
}
