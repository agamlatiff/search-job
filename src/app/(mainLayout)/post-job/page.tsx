import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import CreateJobForm from "@/components/forms/CreateJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";

const companies = [
  { id: 0, name: "ArcJet", logo: "/arcjet.jpg" },
  { id: 1, name: "Inngest", logo: "/inngest-locale.png" },
  { id: 2, name: "ArcJet", logo: "/arcjet.jpg" },
  { id: 3, name: "Inngest", logo: "/inngest-locale.png" },
  { id: 4, name: "ArcJet", logo: "/arcjet.jpg" },
  { id: 5, name: "Inngest", logo: "/inngest-locale.png" },
];

const testimonials = [
  {
    quote:
      "Posting our job openings here has been a game changer. We received quality applicants within days.",
    author: "Sarah Johnson",
    company: "TechNova Solutions",
  },
  {
    quote:
      "The platform made it simple to connect with the right candidates for our remote positions.",
    author: "Michael Lee",
    company: "BrightPath Inc.",
  },
  {
    quote:
      "We hired two amazing developers in less than a week. Highly recommended for startups!",
    author: "Emily Carter",
    company: "CodeWave Labs",
  },
  {
    quote:
      "As a growing company, speed matters. This job board delivered fast and relevant applications.",
    author: "Daniel Smith",
    company: "NextGen Software",
  },
  {
    quote:
      "The quality of applicants exceeded our expectations. It felt like the right people just found us.",
    author: "Olivia Martin",
    company: "GreenField Analytics",
  },
  {
    quote:
      "Posting jobs was intuitive and smooth. We quickly filled our design role without hassle.",
    author: "James Walker",
    company: "PixelCraft Studio",
  },
  {
    quote:
      "We were impressed by the number of highly skilled professionals who applied through the platform.",
    author: "Sophia Rodriguez",
    company: "Visionary AI",
  },
  {
    quote:
      "Thanks to this platform, we found our new marketing lead in record time.",
    author: "David Kim",
    company: "BlueSky Ventures",
  },
];

const stats = [
  { id: 0, value: "10k+", label: "Monthly active job seekers" },
  { id: 1, value: "48h", label: "Average time to hire" },
  { id: 2, value: "95%", label: "Employer statisfaction rate" },
  { id: 3, value: "500+", label: "Companies hiring remotely" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }

  return data;
}

const PostJobPage = async () => {
  const session = await requireUser();
  const data = await getCompany(session?.id as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />
      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Indsutry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logo */}

            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="spcae-y-4">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial.author}, {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="rounded-lg bg-muted p-4">
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
