"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import UserTypeSelection from "./UserTypeSelection";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";

type UserSelectionType = "Company" | "JobSeeker" | null;

const OnBoardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "Company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <Image src={"/logo.png"} alt="SearchJob Logo" height={50} width={50} />
        <h1 className="text-4xl font-bold">
          Search<span className="text-primary">Job</span>
        </h1>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};

export default OnBoardingForm;
