import React from "react";
import { FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { AiOutlineClose } from "react-icons/ai";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesComponent =
    FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}>
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesComponent elmentInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
