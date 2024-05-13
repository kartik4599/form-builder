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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { BsTextParagraph } from "react-icons/bs";

const type: ElementsType = "ParagraphField";

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    text: string;
  };
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

const DesignerComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">SubTitle field</Label>
      <p className="text-sm">{text}</p>
    </div>
  );
};

const PropertiesComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { text } = element.extraAttributes;
  const { updateChanges } = useDesigner();

  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: { text },
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Title Field</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
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
  const { text } = element.extraAttributes;
  return <p className="text-sm">{text}</p>;
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  propertiesComponent: PropertiesComponent,
  formComponent: FormComponent,
  designerBtnElement: {
    icon: BsTextParagraph,
    label: "Paragraph",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      text: "Paragraph Field",
    },
  }),
  validate: () => true,
};
