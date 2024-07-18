export const getCollaboratorData = (data: any, user: any) => {
  let collaborators = data.map((collaborator: any) => {
    let username = collaborator.email.split("@")[0];
    return {
      name: username,
      contract_type: "Master",
      role: "Owner",
      bps: "100.00%",
      status: true,
    };
  });
  collaborators.unshift({
    name: user.username,
    contract_type: "",
    role: "Owner",
    bps: "100.00%",
    status: false,
  });
  return collaborators;
};
