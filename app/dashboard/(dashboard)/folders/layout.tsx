import React from "react";

interface FolderLayoutProps {
  children: React.ReactNode;
}

const folderLayout = ({ children }: FolderLayoutProps) => {
  return <div>{children}</div>;
};

export default folderLayout;
