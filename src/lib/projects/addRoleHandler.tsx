export const addRoleHandler = async (
  id: string,
  user_role: string,
  contract_type: string,
  invitationIdd: string
) => {
  let roleData = {
    project_id: id,
    user_role: user_role,
    contract_type: contract_type,
    user_bps: 10000,
    invitation_id: invitationIdd,
  };
  const response = await fetch("/api/userProjects/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleData),
  });

  return await response.json();
};
