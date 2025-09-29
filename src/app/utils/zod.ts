import z from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(1, "Location must be defined"),
  about: z
    .string()
    .min(10, "Please provide some information about your company"),
  logo: z.string().min(1, "Please upload a logo"),
  website: z.string().url("Please provide a valid URL"),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "Please provide some information about yourself"),
  resume: z.string().min(1, "Please upload a resume"),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  employementType: z.string().min(1, "Please select an employement type"),
  location: z.string().min(1, "Please select a location"),
  salaryFrom: z.number().min(1, "Salary from is required"),
  salaryTo: z.number().min(1, "Salary to is required"),
  jobDescription: z.string().min(10, "Please provide a job description"),
  listingDuration: z.number().min(1, "listing duration is required"),
  benefits: z.array(z.string()).min(1, "Please select atleast one benefit"),
  companyName: z.string().min(1, "Company name is required"),
  companyLocation: z.string().min(1, "Company Location is required"),
  companyAbout: z.string().min(10, "Company description is required"),
  companyLogo: z.string().min(1, "Logo is required"),
  companyWebsite: z.string().min(1, "Company Website is required"),
  companyXAccount: z.string().optional(),
});
