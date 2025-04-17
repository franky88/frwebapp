import { format } from "date-fns";
import DeleteExperience from "./DeleteExperience";
import UpdateExperience from "./UpdateExperience";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckBig, MapPin } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ExperienceListProps {
  loading: boolean;
  experiences: ExperienceType[];
  experienceRefetch: () => void;
}

const ExperienceList = ({
  experiences,
  loading,
  experienceRefetch,
}: ExperienceListProps) => {
  if (loading) return <p>Loading...</p>;
  if (experiences.length === 0) return <p>No experiences found</p>;
  return (
    <div>
      <div className="masonry-grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((exp) => (
          <Card key={exp._id} className="masonry-grid-item">
            <CardHeader>
              <CardTitle>{exp.title.toUpperCase()}</CardTitle>
              <CardDescription>
                <div className="flex justify-between items-start">
                  <div>
                    {exp.company.toUpperCase()} - ({" "}
                    {format(new Date(exp.from), "MMM yyyy")} -{" "}
                    {exp.to ? format(new Date(exp.to), "MMM yyyy") : "Present"})
                    <div>
                      <small className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" /> {exp.location}
                      </small>
                    </div>
                  </div>
                  <div>
                    <Link
                      href={exp.url ? exp.url : "#"}
                      className="flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Avatar>
                        <AvatarImage
                          src={exp.image ? exp.image : "#"}
                          className="bg-slate-400"
                        />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>{" "}
                      Website
                    </Link>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              Tasks and Responsibilities:
              <div className="flex flex-wrap gap-2">
                {exp.description?.split(",").map((task, index) => (
                  <article
                    key={index}
                    className="flex items-center gap-2 border-1 px-2 mb-2 rounded-md"
                  >
                    <p className="flex items-center gap-1">
                      <CircleCheckBig className="h-4 w-4" /> {task}
                    </p>
                  </article>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto">
              <small className="text-sm text-muted-foreground">
                Created at: {format(new Date(exp.createdAt), "PP")}
              </small>
              <div className="flex gap-1 mt-2">
                <UpdateExperience
                  experience={exp}
                  onExperienceUpdated={experienceRefetch}
                />
                <DeleteExperience
                  id={exp._id}
                  onExperienceDelete={experienceRefetch}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
