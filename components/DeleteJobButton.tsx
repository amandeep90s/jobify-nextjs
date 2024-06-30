import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const DeleteJobButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
        queryClient.invalidateQueries({ queryKey: ["charts"] });
        toast({ description: "Job removed" });
      } else {
        toast({ description: "There was an error" });
      }
    },
  });
  return (
    <Button size={"sm"} disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteJobButton;
