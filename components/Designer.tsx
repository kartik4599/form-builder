import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesigner from "./hooks/useDesigner";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import idgenerator from "@/lib/idgenerator";
import { useState } from "react";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
  const { addElement, elements, setSelectedElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop=area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active.data?.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idgenerator());
        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div onClick={() => setSelectedElement(null)} className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "right-2 ring-primary/20"
          )}>
          {droppable.isOver
            ? !elements.length && (
                <div className="p-4 w-full">
                  <div className="h-[120px] rounded-md bg-primary/20" />
                </div>
              )
            : !elements.length && (
                <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                  Drop here
                </p>
              )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <div>
                  <DesignerElementWrapper key={element.id} element={element} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const [mouseHover, setMouseHover] = useState(false);
  const { removeElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      elementId: element.id,
      type: element.type,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerComponent = FormElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset">
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md top-0"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 rounded-b-md h-1/2"
      />
      {mouseHover && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500">
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full h-[5px] rounded-md bg-primary rounded-b-none" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full h-[5px] rounded-md bg-primary rounded-t-none" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center justify-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
          mouseHover && "opacity-10"
        )}>
        <DesignerComponent elmentInstance={element} />
      </div>
    </div>
  );
};

export default Designer;
