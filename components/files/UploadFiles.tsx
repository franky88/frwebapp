"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "../ui/button";
import { LoaderCircle, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { uploadFiles } from "@/app/actions/krakenAPIActions";
import { Checkbox } from "../ui/checkbox";

interface UploadFilesProps {
  id: string;
}

const UploadFiles = ({ id }: UploadFilesProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setLoading(true);
      const res = await uploadFiles(id, formData);
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant={"link"} onClick={() => setOpen(true)} disabled={loading}>
        {loading ? (
          <div className="flex gap-2 items-center">
            <LoaderCircle className="animate-spin" />
            Uploading...
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Upload />
            Upload
          </div>
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload new files</DialogTitle>
            <DialogDescription>
              Upload new files to your profile.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleUpload}
            className="flex flex-col gap-4 items-start"
          >
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="files">Files</Label>
              <Input id="files" type="file" name="files" required multiple />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="premiumOnly" name="premiumOnly" />
              <Label htmlFor="premiumOnly">Premium Only</Label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex gap-2 items-center">
                  <LoaderCircle className="animate-spin" /> Uploading
                </div>
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadFiles;
