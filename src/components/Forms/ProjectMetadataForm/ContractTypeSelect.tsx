import { Label } from "@/components/ui/label";
import { ContractType, contractTypeOptions } from "@/types/projectMetadataForm";
import ProjectmetadataSelect from "./ProjectMetadataSelect";

const ContractTypeSelect = () => {
  const contractType = ContractType.Songwriting;
  const label = contractTypeOptions.find(
    (v) => v.value === contractType
  )?.label;

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">Contract Type</Label>
      <ProjectmetadataSelect
        value={contractType}
        label={label}
        options={contractTypeOptions}
      />
    </div>
  );
};

export default ContractTypeSelect;
