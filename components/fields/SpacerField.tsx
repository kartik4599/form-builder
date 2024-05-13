"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import * as z from "zod";
import { LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "../hooks/useDesigner";
import { useEffect } from "react";

const type: ElementsType = "SpacerField";
type CustomInstance = FormElementInstance & {
  extraAttributes: {
    height: number;
  };
};

const DesignerComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer Field: {height}px</Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </div>
  );
};

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

const PropertiesComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const { updateChanges } = useDesigner();
  const element = elmentInstance as CustomInstance;
  const { height } = element.extraAttributes;
  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: {
      height,
    },
  });

  const applyChanges = (value: propertiesSchemaType) => {
    updateChanges(elmentInstance.id, {
      ...elmentInstance,
      extraAttributes: value,
    });
  };

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height :{form.watch("height")}px</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription>
                The Height of the field.
                <br />
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const FormComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return <div style={{ height, width: "100%" }} />;
};

export const SpacerFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Field",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      height: 20,
    },
  }),
  validate: () => true,
};
