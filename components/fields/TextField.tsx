"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const type: ElementsType = "TextField";
type CustomInstance = FormElementInstance & {
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    placeHolder: string;
  };
};

const designerComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { label, helperText, required, placeHolder } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <span className="text-muted-foreground text-[0.8rem]">
          {helperText}
        </span>
      )}
    </div>
  );
};

const propertiesComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>label</Label>
    </div>
  );
};

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent,
  propertiesComponent,
  formComponent: () => <div></div>,
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper text",
      required: false,
      placeHolder: "Value here...",
    },
  }),
};
