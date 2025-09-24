import OnBoardingForm from "@/components/forms/onBoarding/OnBoardingForm";
import { prisma } from "../utils/db";
import { id } from "zod/v4/locales";
import { redirect } from "next/navigation";
import { requireUser } from "../utils/requireUser";

async function checkIfUserHasFinishedOnboarding(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      onBoardingCompleted: true,
    },
  });

  if (user?.onBoardingCompleted === true) {
    redirect("/");
  }
  
  return user;
}

const OnboardingPage = async () => {
  const session = await requireUser();
  await checkIfUserHasFinishedOnboarding(session?.id as string);

  return (
    <div className="min-h-screen flex-col flex items-center justify-center w-screen py-10">
      <OnBoardingForm />
    </div>
  );
};

export default OnboardingPage;
