import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: (event) => {
      setDraggedItem(null);
    },
    onDragEnd: (event) => {
      setDraggedItem(null);
    },
  });

  let node = <div>No drag overlay</div>;
  const isDesignerBtnElement = draggedItem?.data.current?.isDesignerBtnElement;

  if (isDesignerBtnElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const Component = FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <Component elmentInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
