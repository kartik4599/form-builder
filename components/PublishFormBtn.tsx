import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { FaSpinner } from "react-icons/fa";
import { useTransition } from "react";
import { publishFormById } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const PublishFormBtn = ({ id }: { id: number }) => {
  const [loading, loadTranstion] = useTransition();
  const router = useRouter();

  const publishForm = async () => {
    try {
      await publishFormById(id);
      toast({
        title: "Success",
        description: "Your form is now available to the public",
      });
      router.refresh();
    } catch (e) {
      console.log(e);

      toast({
        title: "Error",
        description: "Something went wrong. Please try again later. ",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500">
          <MdOutlinePublish className="h-5 w-5" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              loadTranstion(publishForm);
            }}
            disabled={loading}>
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
