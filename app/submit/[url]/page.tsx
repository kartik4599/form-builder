import { getFormByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

const page = async ({ params }: { params: { url: string } }) => {
  const { url } = params;
  const { content } = await getFormByUrl(url);
  if (!content) throw new Error("Form not found");
  const formContent = JSON.parse(content) as FormElementInstance[];

  return <FormSubmitComponent formContent={formContent} formUrl={url} />;
};

export default page;
