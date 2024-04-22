import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import useDesigner from "./hooks/useDesigner";
import { updateFormById } from "@/actions/form";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const json = JSON.stringify(elements);
      await updateFormById(id, json);
      toast({
        title: "Success",
        description: "Your form has been saved!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      onClick={() => startTransition(updateFormContent)}
      disabled={loading}>
      <HiSaveAs className="h-5 w-5" />
      Save
      {loading && <FaSpinner className="h-5 w-5 animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
