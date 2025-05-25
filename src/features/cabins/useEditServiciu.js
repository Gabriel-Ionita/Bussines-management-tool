import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditServiciu } from "../../services/apiservicii";

export function useEditServiciu() {
  const queryClient = useQueryClient();

  const { mutate: editServiciu, isLoading: isEditing } = useMutation({
    mutationFn: ({ newServiciuData, id }) =>
      createEditServiciu(newServiciuData, id),
    onSuccess: () => {
      toast.success("Serviciu editat  cu succes!");
      queryClient.invalidateQueries({
        queryKey: ["serviciu"],
      });
    },
    onError: (error) => {
      toast.error(`Eroare la crearea serviciului: ${error.message}`);
    },
  });
  return { isEditing, editServiciu };
}
