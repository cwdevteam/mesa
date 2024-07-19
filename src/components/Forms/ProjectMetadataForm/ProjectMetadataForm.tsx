import ContractTypeSelect from "./ContractTypeSelect";
import UserRoleSelect from "./UserRoleSelect";
import SplitsInput from "./SplitsInput";
import CloseButton from "./CloseButton";

const ProjectMetadataForm = ({ request }: { request: string }) => (
  <div className="grid gap-6">
    <ContractTypeSelect />
    <UserRoleSelect />
    <SplitsInput />
    <CloseButton request={request} />
  </div>
);

export default ProjectMetadataForm;
