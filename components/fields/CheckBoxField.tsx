"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
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
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { IoMdCheckbox } from "react-icons/io";

const type: ElementsType = "CheckBoxField";
type CustomInstance = FormElementInstance & {
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
  };
};

const designerComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Checkbox id={id} disabled />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <span className="text-muted-foreground text-[0.8rem]">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(50),
  required: z.boolean().default(false),
});

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

const propertiesComponent = ({
  elmentInstance,
}: {
  elmentInstance: FormElementInstance;
}) => {
  const element = elmentInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  const { updateChanges } = useDesigner();

  const form = useForm<propertiesSchemaType>({
    resolver: zodResolver(propertiesSchema),
    defaultValues: {
      label,
      helperText,
      required,
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
  submitValue,
  isInvalid,
  defaultValues,
}: {
  elmentInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValues?: string;
}) => {
  const element = elmentInstance as CustomInstance;
  const { label, helperText, required, placeHolder } = element.extraAttributes;
  const [value, setValue] = useState(defaultValues === "true");
  const [error, setError] = useState(false);
  console.log({ defaultValues });

  useEffect(() => {
    if (isInvalid) setError(true);
    else setError(false);
  }, [isInvalid]);

  const id = `checkbox-${element.id}`;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? "true" : "false";
          const valid = CheckBoxFormElement.validate(
            elmentInstance,
            stringValue
          );
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(error && "text-red-500")}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <span
            className={cn(
              "text-muted-foreground text-[0.8rem]",
              error && "text-red-500"
            )}>
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};

export const CheckBoxFormElement: FormElement = {
  type,
  designerComponent,
  propertiesComponent,
  formComponent,
  designerBtnElement: {
    icon: IoMdCheckbox,
    label: "Checkbox Field",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Checkbox Field",
      helperText: "Helper text",
      required: false,
    },
  }),
  validate(FormElement, currentValue) {
    const {
      extraAttributes: { required },
    } = FormElement as CustomInstance;
    if (required) {
      return currentValue === "true";
    }
    return true;
  },
};
