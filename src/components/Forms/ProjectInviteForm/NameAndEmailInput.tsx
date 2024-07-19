import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectInviteProvider } from "@/context/ProjectInviteProvider";

const NameAndEmailInput = () => {
  const { setName, setEmail } = useProjectInviteProvider();

  return (
    <div className="flex flex-col gap-4">
      <Label className="sr-only" htmlFor="name">
        Name
      </Label>
      <Input
        id="name"
        name="name"
        placeholder="Team member"
        type="text"
        autoCapitalize="none"
        autoCorrect="off"
        required
        onChange={(e) => setName(e.target.value)}
      />

      <Label className="sr-only" htmlFor="email">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default NameAndEmailInput;
