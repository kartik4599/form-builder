import { IconType } from "react-icons/lib";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: IconType;
    label: string;
  };
  designerComponent: React.FC<{
    elmentInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elmentInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elmentInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
