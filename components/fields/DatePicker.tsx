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
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { BsFillCalendar2DateFill, BsFillCalendarDateFill } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const type: ElementsType = "DateField";

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

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
      </Button>
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
  const { label, helperText, required } = element.extraAttributes;
  const [date, setDate] = useState<Date | undefined>(
    defaultValues ? new Date(defaultValues) : undefined
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isInvalid) setError(true);
    else setError(false);
  }, [isInvalid]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            initialFocus
            onSelect={(date) => {
              setDate(date);
              if (!submitValue) return;
              const value = date?.toUTCString() || "";
              const valid = DateFieldFormElement.validate(element, value);
              setError(!valid);
              submitValue(element.id, value);
            }}
          />
        </PopoverContent>
      </Popover>
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
  );
};

export const DateFieldFormElement: FormElement = {
  type,
  designerComponent,
  propertiesComponent,
  formComponent,
  designerBtnElement: {
    icon: BsFillCalendar2DateFill,
    label: "Date Field",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Date Field",
      helperText: "Pick a date",
      required: false,
    },
  }),
  validate(FormElement, currentValue) {
    const {
      extraAttributes: { required },
    } = FormElement as CustomInstance;
    if (required) {
      return currentValue.length > 0;
    }
    return true;
  },
};
