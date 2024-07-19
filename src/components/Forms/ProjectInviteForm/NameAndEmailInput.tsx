import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NameAndEmailInput = () => (
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
    />
  </div>
);

export default NameAndEmailInput;
