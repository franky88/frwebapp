import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import DeleteProject from "./DeleteProject";

interface ProjectListProp {
  projects: ProjectType[];
  selectedIds: string[];
  handleSelect: (id: string) => void;
  refreshProjects: () => void;
}

const ProjectList = ({
  projects,
  selectedIds,
  handleSelect,
  refreshProjects,
}: ProjectListProp) => {
  return (
    <div className="border-1 rounded-md">
      <Table>
        <TableCaption>A list of your recent projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3">Select</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Project URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length < 1 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No projects
              </TableCell>
            </TableRow>
          )}
          {projects.map((p) => (
            <TableRow key={p._id}>
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedIds.includes(p._id)}
                  onCheckedChange={() => handleSelect(p._id)}
                />
              </TableCell>
              <TableCell className="font-medium">
                {p.name.toUpperCase()}
              </TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell>{p.categoryName}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={p.image} />
                  <AvatarFallback>PI</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Link href={p.url}>View project</Link>
              </TableCell>
              <TableCell className="text-right">
                <div>
                  <DeleteProject id={p._id} onProjectDelete={refreshProjects} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
