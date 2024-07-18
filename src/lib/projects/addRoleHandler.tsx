import axios from "axios";

export const addRoleHandler = async (
  id: string,
  user_role: string,
  contract_type: string
) => {
  let roleData = {
    project_id: id,
    user_role: user_role,
    contract_type: contract_type,
    user_bps: 1000,
  };
  let { data: role } = await axios.post("/api/userProjects/", roleData);

  return role;
};
