import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditServiciu } from "../../services/apiservicii";
import { useMutation } from "@tanstack/react-query";
export const useCreateServiciu = () => {
  const queryClient = useQueryClient();

  const { mutate: createServiciu, isLoading: isCreating } = useMutation({
    mutationFn: createEditServiciu,
    onSuccess: () => {
      toast.success("Serviciu creat cu succes!");
      queryClient.invalidateQueries({
        queryKey: ["serviciu"],
      });
      // Reset the form after successful submission
    },
    onError: (error) => {
      toast.error(`Eroare la crearea serviciului: ${error.message}`);
    },
  });
  return { isCreating, createServiciu };
};
