"use server";

import type z from "zod";
import { requireUser } from "./utils/requireUser";
import { companySchema, jobSeekerSchema } from "./utils/zod";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arjcet, { shield } from "./utils/arjcet";
import { detectBot, request } from "@arcjet/next";

const aj = arjcet.withRule(shield({
  mode: "LIVE",
})).withRule(
  detectBot({
    mode: "LIVE",
    allow: []
  })
)
export async function createCompany(data: z.infer<typeof companySchema>) {
  const session = await requireUser();
  
  const req = await request()
  const decision = await aj.protect(req)
  
  if (decision.isDenied()) {
    throw new Error('Forbidden')
  }

  const validateData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session?.id,
    },
    data: {
      onBoardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validateData,
        },
      },
    },
  });

  return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const session = await requireUser();

  const validate = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: session?.id,
    },
    data: {
      onBoardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validate,
        },
      },
    },
  });

  return redirect("/");
}
