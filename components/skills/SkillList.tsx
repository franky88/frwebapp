import DeleteSkill from "./DeleteSkill";
import UpdateSkill from "./UpdateSkill";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import { Eye, EyeClosed } from "lucide-react";

interface SkillListProps {
  skills: SkillType[];
  skillsRefetch: () => void;
}

const SkillList = ({ skills, skillsRefetch }: SkillListProps) => {
  if (skills.length === 0) return <p>No skills found</p>;
  return (
    <div>
      <h2 className="text-xl font-bold">Skill List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skills</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell className={`${exp.hidden ? "bg-slate-200" : ""}`}>
                <div className="flex justify-between">
                  <div>
                    <strong>
                      I am specialize in{" "}
                      <span className="text-[#11DF97]">
                        {exp.type} {exp.name}
                      </span>
                    </strong>
                  </div>
                  <div className="flex items-center gap-4">
                    {exp.hidden ? <EyeClosed /> : <Eye />}
                    <UpdateSkill onUpdateSkill={skillsRefetch} skill={exp} />
                    <DeleteSkill id={exp._id} onSkillDelete={skillsRefetch} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkillList;
