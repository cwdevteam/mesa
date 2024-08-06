import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjectProvider } from "@/context/ProjectProvider";

const TitleAndDescription = () => {
  const { name, description } = useProjectProvider();

  return (
    <div className="flex">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name">Title:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          disabled
        />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          name="description"
          id="description"
          required
          value={description}
          disabled
        />
      </div>
    </div>
  );
};

export default TitleAndDescription;
