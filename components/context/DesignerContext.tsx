"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateChanges: (id: string, element: FormElementInstance) => void;
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

const DesignerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prevElements) => {
      const newElements = [...prevElements];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prevElements) => {
      return prevElements.filter((element) => element.id !== id);
    });
  };

  const updateChanges = (elementId: string, element: FormElementInstance) => {
    setElements((prevElements) => {
      const index = prevElements.findIndex(
        (element) => element.id === elementId
      );
      if (index !== -1) {
        prevElements[index] = element;
      }
      return prevElements;
    });
    setSelectedElement(element);
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateChanges,
        setElements,
      }}>
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerContextProvider;
