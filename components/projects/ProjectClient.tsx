"use client";

import { useEffect, useState } from "react";
import { deleteProjects, getProjects } from "@/app/actions/projectActions";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import AddCategory from "./category/AddCategory";
import { getCategories } from "@/app/actions/categoryActions";
import CategoryFilterMenu from "./category/CategoryFilterMenu";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import DeleleProjects from "./DeleleProjects";
const ProjectClient = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string | boolean | null>(
    false
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchProjects = async () => {
    try {
      const projects = await getProjects({ categoryName: categoryName });
      console.log("Projects", projects);
      setProjects(projects);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [categoryName]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const res = await deleteProjects(selectedIds);
    if (res.success) {
      setSelectedIds([]);
      await fetchProjects();
      toast.success("Projects successfully deleted!");
    } else {
      toast.error(res.error);
    }
  };

  const handleDataRecieved = (data: string | boolean | null) => {
    setCategoryName(data);
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex justify-between w-full bg-white">
        <h1 className="text-2xl font-bold">Project List</h1>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <DeleleProjects
              selectedIds={selectedIds}
              handleBulkDelete={handleBulkDelete}
            />
          )}
          <div className="flex items-center bg-slate-200 rounded-md">
            <CategoryFilterMenu
              categories={categories}
              sendDataToParent={handleDataRecieved}
            />
            {categoryName && (
              <div className="flex gap-2 items-center rounded-md border-1 py-1 px-2 bg-slate-200">
                Category name: <strong>{categoryName}</strong>
                <Button
                  variant={"secondary"}
                  className="h-5 w-5 px-2 py-0"
                  onClick={() => handleDataRecieved(false)}
                >
                  x
                </Button>
              </div>
            )}
          </div>

          <AddCategory onCategoryAdded={fetchCategories} />
          <AddProject onProjectAdded={fetchProjects} categories={categories} />
        </div>
      </div>
      <div className="w-full">
        <ProjectList
          selectedIds={selectedIds}
          handleSelect={handleSelect}
          projects={projects}
          refreshProjects={fetchProjects}
        />
      </div>
    </div>
  );
};

export default ProjectClient;
