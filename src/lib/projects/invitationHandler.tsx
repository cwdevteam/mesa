export const invitationHandler = async (
  description: string,
  name: string,
  user: any,
  projectId: string,
  status: string,
  userName: string,
  email: string,
  role: string
) => {
  let invitationData = {
    contract_type: "Master",
    created_by: user.id,
    description,
    title: name,
    status: status,
    user_bps: 10000,
    user_email: email,
    user_id: user.id,
    user_name: userName,
    user_role: role,
    project_id: projectId,
  };

  const response = await fetch("/api/invitations/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invitationData),
  });

  return await response.json();
};
