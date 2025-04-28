"use client";

import { getFile } from "@/app/actions/krakenAPIActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

interface FileDetailsProps {
  hashId: string;
}

const FileDetails = ({ hashId }: FileDetailsProps) => {
  const [dataFile, setDataFile] = useState<FileType | null>(null);
  const [open, setOpen] = useState(false);

  const fetchFile = async () => {
    try {
      const file = await getFile(hashId);
      setDataFile(file.data || null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchFile();
  }, []);

  return (
    <>
      {dataFile?.url ? (
        <button
          className="text-start text-lg text-blue-500 hover:text-blue-400"
          onClick={() => setOpen(true)}
        >
          {dataFile.name}
        </button>
      ) : (
        <span>{dataFile?.name || "No file found"}</span>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new project</DialogTitle>
            <DialogDescription>
              Add a new project to your profile.
            </DialogDescription>
          </DialogHeader>
          <a href={dataFile?.url} target="_blank">
            <img
              src={`https://s5.krakenfiles.com/uploads/${dataFile?.uploadDate}/${dataFile?.hash}/${dataFile?.type}.${dataFile?.extension}`}
            />
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileDetails;
