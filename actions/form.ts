"use server";

import prisma from "@/lib/db";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";

export async function getFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const stats = await prisma.form.aggregate({
    where: { userId: user.id },
    _sum: {
      submission: true,
      visits: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submission || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}

export async function createForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation) throw new Error("form not valid");

  const user = await currentUser();
  if (!user) throw new Error("User not found");

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) throw new Error("Form not created");

  return form.id;
}

export async function getForm() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
  });

  return forms;
}
