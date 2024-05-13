"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LuHeading1 } from "react-icons/lu";

const type: ElementsType = "TitleField";

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    title: string;
  };
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

const DesignerComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title Field</Label>
      <Label className="text-xl">{title}</Label>
    </div>
  );
};

const PropertiesComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { title } = element.extraAttributes;
  const { updateChanges } = useDesigner();

  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: { title },
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title Filed</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
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
  const { title } = element.extraAttributes;

  return <p className="text-xl">{title}</p>;
};

export const TitleFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  designerBtnElement: {
    icon: LuHeading1,
    label: "Title Field",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      title: "Title Field",
    },
  }),
  validate: () => true,
};
