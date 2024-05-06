"use client";
import { HiCursorClick } from "react-icons/hi";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "./ui/use-toast";
import { updateFormByUrl } from "@/actions/form";

const FormSubmitComponent = ({
  formContent,
  formUrl,
}: {
  formContent: FormElementInstance[];
  formUrl: string;
}) => {
  const formValue = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submited, setSubmited] = useState(false);
  const [pending, startTransition] = useTransition();

  const submitValue = useCallback((key: string, value: string) => {
    formValue.current[key] = value;
  }, []);

  const validateForm = useCallback(() => {
    formErrors.current = {};
    formContent.forEach((content) => {
      const value = formValue.current[content.id] || "";
      const valid = FormElements[content.type].validate(content, value);
      if (!valid) formErrors.current[content.id] = true;
    });

    if (Object.keys(formErrors.current).length > 0) return false;

    return true;
  }, [formContent]);

  const submitForm = async () => {
    const valid = validateForm();
    if (!valid) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const content = JSON.stringify(formValue.current);
      await updateFormByUrl(formUrl, content);
      setSubmited(true);
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  
  if (submited)
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[650px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-xl">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form,you can close this page now.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[650px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-xl"
      >
        {formContent.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elmentInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValues={formValue.current[element.id]}
            />
          );
        })}
        <Button
          disabled={pending}
          className="mt-8"
          onClick={() => startTransition(submitForm)}
        >
          <HiCursorClick className="mt-2" />
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
