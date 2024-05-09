import { IconType } from "react-icons/lib";
import { ParagraphFieldFormElement } from "./fields/ParagraphField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";
import { SeparatorFieldFormElement } from "./fields/Seprator";
import { SpacerFieldFormElement } from "./fields/SpacerField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SepratorField"
  | "SpacerField";

export type SubmitFunction = (key: string, value: string) => void;

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
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValues?: string;
  }>;
  propertiesComponent: React.FC<{
    elmentInstance: FormElementInstance;
  }>;
  validate: (FormElement: FormElementInstance, currentValue: string) => boolean;
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
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SepratorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
};
