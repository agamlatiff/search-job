import { jobSeekerSchema } from "@/app/utils/zod";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type z from "zod";

const JobSeekerForm = () => {
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
    },
  });

  return (
    <Form {...form}>
      <form action="" className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Input placeholder="Tell us about yourself..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={field.value}
                        alt="Company Logo"
                        height={100}
                        width={100}
                        className="rounded-lg"
                      />
                      <Button
                        className="absolute -top-2 -right-2"
                        type="button"
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => {
                          field.onChange("");
                        }}
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint={"resumeUploader"}
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={() => {
                        console.log("error");
                      }}
                      className="ut-upload-icon:size-20 ut-upload-icon:text-muted-foreground ut-button:bg-primary ut-button:text-white ut-button:mt-5 ut-button:border-primary/50 ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary rounded-md in-ut-upload-icon:text-red-500 ut-button:w-1/2 has-ut-upload-icon:size-5"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default JobSeekerForm;
