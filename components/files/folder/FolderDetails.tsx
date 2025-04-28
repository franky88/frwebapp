"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { toSentenceCase } from "@/utils/sentenceCase";
import { Folder } from "lucide-react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../../ui/table";
import { getFiles, getFolders } from "@/app/actions/krakenAPIActions";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import FileDetails from "./FileDetails";
import Link from "next/link";
import DeleteFile from "./DeleteFile";
import Image from "next/image";

interface FolderDetailsProps {
  folderId: string;
}

const FolderDetails = ({ folderId }: FolderDetailsProps) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [folder, setFolder] = useState<FolderType>();

  const fetchFolder = async () => {
    try {
      const folders = await getFolders();
      if (folders.status === 200) {
        const currentFolder = folders.data.find(
          (folder) => folder.id === folderId
        );
        setFolder(currentFolder);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      console.log("Response data", response.data);
      const folderFiles = response.data.filter(
        (file: FileType) => file.folderId === folderId
      );
      console.log("folder files", folderFiles);
      setFiles(folderFiles || []);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchFolder();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <Link href="/dashboard/folders">Folders</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <Folder className="h-4" />{" "}
                {folder?.name.charAt(0).toUpperCase() +
                  `${folder?.name.slice(1).toLocaleLowerCase()}`}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="rounded-md p-2 w-full mt-4">
        <UploadFile folderId={folderId} updateFolderFiles={fetchFiles} />
        <div className="border-1 rounded-md mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Files</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.hash}>
                  <TableCell className="flex gap-2 items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Image
                        src={`https://s5.krakenfiles.com/uploads/${file?.uploadDate}/${file?.hash}/${file?.type}.${file?.extension}`}
                        width={200}
                        height={200}
                        alt={file.name}
                        className="border-1 rounded-md"
                      />
                      {/* https://s5.krakenfiles.com/uploads/${file?.uploadDate}/${file?.hash}/${file?.type}.${file?.extension} */}
                      <div className="flex flex-col">
                        <FileDetails hashId={file.hash} />
                        <small>
                          File type: {toSentenceCase(file.type)} | File
                          extension: {file.extension} | File size: {file.size}
                        </small>
                        <small>Upload date: {file.uploadDate}</small>
                      </div>
                    </div>

                    <div>
                      <DeleteFile updateFiles={fetchFiles} hashId={file.hash} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FolderDetails;
