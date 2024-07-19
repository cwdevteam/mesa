import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContractType, contractTypeOptions } from "@/types/projectMetadataForm";

const ContractTypeSelect = () => {
  const contractType = ContractType.Songwriting;

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">Contract Type</Label>
      <Select value={contractType}>
        <SelectTrigger className="bg-card border-none">
          <div className="flex items-center gap-2">
            <SelectValue className="text-sm font-semibold">
              {contractTypeOptions.find((v) => v.value === contractType)?.label}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {contractTypeOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {label ?? value}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ContractTypeSelect;
