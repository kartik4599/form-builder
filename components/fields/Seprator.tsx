"use client";

import { ElementsType, FormElement } from "../FormElements";
import { Label } from "../ui/label";
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";

const type: ElementsType = "SepratorField";

const DesignerComponent = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Seprator Field</Label>
      <Separator />
    </div>
  );
};

const PropertiesComponent = () => {
  return <p>No property for this field</p>;
};

const FormComponent = () => <Separator />;

export const SeparatorFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator",
  },
  construct: (id: string) => ({
    id,
    type,
  }),
  validate: () => true,
};
