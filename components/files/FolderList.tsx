import { Folder } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";

interface FolderListProps {
  folders: FolderType[];
}

const FolderList = ({ folders }: FolderListProps) => {
  return (
    <>
      Folders
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Folders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((folder) => (
            <TableRow key={folder.id}>
              <TableCell className="flex gap-2 items-end">
                <Folder className="text-amber-600" />{" "}
                {folder.name.toUpperCase()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FolderList;
