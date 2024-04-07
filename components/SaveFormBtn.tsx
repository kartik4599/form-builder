import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";

const SaveFormBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSaveAs className="h-5 w-5" />
      Save
    </Button>
  );
};

export default SaveFormBtn;
