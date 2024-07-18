import axios from "axios";

export const addProjectHandler = async (
  id: string,
  name: string,
  description: string,
  userId: string
) => {
  let apiData = {
    id: id,
    title: name,
    description,
    created_by: userId,
  };
  let { data: project } = await axios.post("/api/projects/", apiData);

  return project;
};
