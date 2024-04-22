"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Rethink_Sans } from "next/font/google/index";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdTextFields } from "react-icons/md";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
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

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(50),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

const propertiesComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { label, helperText, required, placeHolder } = element.extraAttributes;
  const { updateChanges } = useDesigner();

  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: {
      label,
      helperText,
      required,
      placeHolder,
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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
              <FormDescription>
                The label of the field.
                <br />
                It will be displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
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
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HelperText</FormLabel>
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
              <FormDescription>
                The HelperText of the field.
                <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>The HelperText of the field.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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

const formComponent = ({
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
      <Input placeholder={placeHolder} />
      {helperText && (
        <span className="text-muted-foreground text-[0.8rem]">
          {helperText}
        </span>
      )}
    </div>
  );
};

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent,
  propertiesComponent,
  formComponent,
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
