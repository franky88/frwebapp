import { Folder, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import DeleteFolder from "./DeleteFolder";
import RenameFolder from "./RenameFolder";
import Link from "next/link";
import UploadFiles from "./UploadFiles";
import CreateFolder from "./CreateFolder";
import { toSentenceCase } from "@/utils/sentenceCase";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../ui/breadcrumb";

interface FolderListProps {
  folders: FolderType[];
  updateFolders: () => void;
}

const FolderList = ({ folders, updateFolders }: FolderListProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard/folders">Folders</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateFolder updateFolders={updateFolders} />
      </div>
      <div className="border-1 rounded-md mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Folders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folders.map((name, index) => (
              <TableRow key={`${name}-${index}`}>
                <TableCell className="flex gap-2 items-center justify-between">
                  <div className="flex items-end gap-2">
                    <Folder className="text-amber-600" />{" "}
                    <Link href={`folders/${name}`}>
                      {toSentenceCase(String(name))}
                    </Link>{" "}
                  </div>
                  {/* <div className="flex gap-2">
                    <UploadFiles id={name} />
                    <RenameFolder
                      id={folder.id}
                      folderName={folder.name}
                      updateFolders={updateFolders}
                    />
                    <DeleteFolder
                      id={folder.id}
                      updateFolders={updateFolders}
                    />
                  </div> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FolderList;
