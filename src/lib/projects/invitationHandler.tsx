import axios from "axios";

export const invitationHandler = async (
  description: string,
  name: string,
  user: any,
  projectId: string,
  status: string,
  userName: string,
  email: string
) => {
  let invitationData = {
    contract_type: "Master",
    created_by: user.id,
    description,
    title: name,
    status: "Accepted",
    user_bps: 10000,
    user_email: email,
    user_id: user.id,
    user_name: userName,
    user_role: "Owner",
    project_id: projectId,
  };
  return await axios.post("/api/invitations/", invitationData);
};
