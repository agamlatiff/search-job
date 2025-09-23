import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";

type UserSelectionType = "Company" | "JobSeeker";
interface UserTypeSelectionProps {
  onSelect: (type: UserSelectionType) => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome! Let's get started</h2>
        <p className="text-muted-foreground ">
          Choose how you would like to use our platform!
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          onClick={() => onSelect("Company")}
          variant={"outline"}
          className="w-full items-center p-6 flex gap-4 border-2 h-auto transition-all duration-200 hover:border-primary hover:bg-primary/50"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="size-6 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-lg">Company / Organization</h3>
            <p>Post jobs and fnd great talent</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelect("JobSeeker")}
          variant={"outline"}
          className="w-full items-center p-6 flex gap-4 border-2 h-auto transition-all duration-200 hover:border-primary hover:bg-primary/50"
        >
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="size-6 text-primary" />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-lg">Job Seeker</h3>
            <p>Find your dream job opportunity</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
