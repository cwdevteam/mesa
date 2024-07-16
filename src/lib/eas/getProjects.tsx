export const getProjects = async (queryParam: any) => {
  const response = await fetch(`/api/projects${queryParam}`);
  return await response.json();
};
