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

  const response = await fetch("/api/projects/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiData),
  });

  return await response.json();
};
