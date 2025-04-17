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
import ToggleDisplay from "./ToggleDisplay";
import { Checkbox } from "../ui/checkbox";

interface SkillListProps {
  skills: SkillType[];
  skillsRefetch: () => void;
  selectedIds: string[];
  handleSelect: (id: string) => void;
}

const SkillList = ({
  skills,
  skillsRefetch,
  selectedIds,
  handleSelect,
}: SkillListProps) => {
  if (skills.length === 0) return <p>No skills found</p>;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3">Select</TableHead>
            <TableHead>Skills</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedIds.includes(exp._id)}
                  onCheckedChange={() => handleSelect(exp._id)}
                />
              </TableCell>
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
                    <ToggleDisplay
                      id={exp._id}
                      isVisible={exp.hidden}
                      onUpdateSkill={skillsRefetch}
                    />
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
