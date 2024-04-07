import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormBtn = () => {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500">
      <MdOutlinePublish className="h-5 w-5" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
