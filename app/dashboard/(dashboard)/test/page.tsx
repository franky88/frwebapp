"use client";
import { CldImage } from "next-cloudinary";

export default function Page() {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fr_file_upload");
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <CldImage
        src="cld-sample-5"
        width="500"
        height="500"
        alt="sample"
        crop={{
          type: "auto",
          source: true,
        }}
      />

      <input type="file" onChange={handleUpload} />
    </>
  );
}
