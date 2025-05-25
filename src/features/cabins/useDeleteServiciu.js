import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteServiciu as deleteServiciuApi } from "../../services/apiservicii";
import { useMutation } from "@tanstack/react-query";

export const useDeleteServiciu = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteServiciu } = useMutation({
    mutationFn: deleteServiciuApi,
    onSuccess: () => {
      toast.success("Serviciu sters cu succes!");

      queryClient.invalidateQueries({
        queryKey: ["serviciu"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteServiciu };
};
