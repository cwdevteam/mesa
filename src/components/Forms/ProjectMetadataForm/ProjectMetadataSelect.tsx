import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectMetadataSelect = ({
  value,
  label,
  options,
  handleChange,
}: any) => (
  <Select value={value} onValueChange={handleChange}>
    <SelectTrigger className="bg-card border-none">
      <div className="flex items-center gap-2">
        <SelectValue className="text-sm font-semibold">{label}</SelectValue>
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {options.map(({ value: optionValue, label: optionLabel }: any) => (
          <SelectItem key={optionValue} value={optionLabel}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {optionLabel ?? optionValue}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default ProjectMetadataSelect;
