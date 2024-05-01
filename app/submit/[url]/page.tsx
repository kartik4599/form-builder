import { getFormByUrl } from "@/actions/form";
import React from "react";

const page = async ({ params }: { params: { url: string } }) => {
  const { url } = params;
  const form = await getFormByUrl(url);
  if (!form) throw new Error("Form not found");

  return <div>SubmissionsTable</div>;
};

export default page;
