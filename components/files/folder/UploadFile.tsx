"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { uploadFiles } from "@/app/actions/krakenAPIActions";
import { toast } from "react-toastify";

interface UploadFileProps {
  folderId: string;
  updateFolderFiles: () => void;
}

const UploadFile = ({ folderId, updateFolderFiles }: UploadFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("files", file);
    formData.append("premiumOnly", "false");

    const result = await uploadFiles(folderId, formData);

    if (result.error) {
      toast.error(`${result.error}`);
    } else {
      toast.success(`${result.message}`);
      setFileName("");
    }

    setIsUploading(false);
    updateFolderFiles();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        variant="outline"
        type="button"
        className="px-4 py-2 border-dashed rounded-lg transition-all w-full h-24"
        onClick={handleButtonClick}
        disabled={isUploading}
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          {isUploading ? <LoaderCircle className="animate-spin" /> : <Upload />}
          {isUploading ? "Uploading..." : "Upload File"}
          {fileName && <small>{fileName}</small>}
        </div>
      </Button>
    </div>
  );
};

export default UploadFile;
